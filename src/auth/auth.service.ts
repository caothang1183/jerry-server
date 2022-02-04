import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CookieOptions, Response as Res } from 'express';
import { omit } from 'lodash';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import Ctx from 'src/common/context.type';
import { signJwt } from 'src/utils/jwt.utils';
import { User, UserDocument } from '../user/model/user.schema';
import { LoginUserInput } from './dto/inputs/login-user.input';
import { RegisterUserInput } from './dto/inputs/register-user.input';
import { VerifyEmailInput } from './dto/inputs/verify-email.input';

const cookieOptions: CookieOptions = {
  domain: 'localhost',
  secure: false,
  sameSite: 'strict',
  httpOnly: true,
  path: '/',
};

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(input: RegisterUserInput): Promise<UserDocument> {
    const confirmToken = nanoid(32);
    return await this.userModel.create({ ...input, confirmToken });
  }

  async confirmUser(input: VerifyEmailInput): Promise<UserDocument> {
    const { email, confirmToken } = input;
    const user = await this.userModel.findOne({ email });
    if (!user) throw new Error('User does not exist');
    if (confirmToken !== user.confirmToken)
      throw new Error('Confirm Token is incorrect');
    if (user.active) throw new Error('Account has been activated');
    user.active = true;
    await user.save();
    return user;
  }

  async login(input: LoginUserInput, context: Ctx): Promise<UserDocument> {
    const { username, password } = input;
    const user = await this.userModel
      .findOne({ username })
      .select('-__v -confirmToken');
    if (!user || !user.comparePassword(password)) {
      throw new Error('Invalid username or password');
    }
    if (!user.active) throw new Error('Please confirm your e-mail address');
    const jwt = signJwt(omit(user.toJSON(), ['password'], ['active']));
    context.res.cookie('token', jwt, cookieOptions);
    return user;
  }

  async loginApi(res: Res, input: LoginUserInput): Promise<object> {
    const { username, password } = input;
    const user = await this.userModel
      .findOne({ username })
      .select('-__v -confirmToken');
    if (!user || !user.comparePassword(password)) {
      throw new Error('Invalid username or password');
    }
    if (!user.active) throw new Error('Please confirm your e-mail address');
    const data = omit(user.toJSON(), ['password'], ['active']);
    const jwt = signJwt(data);
    res.cookie('token', jwt, cookieOptions);
    console.log(res);
    return {
      user: data,
      'access-token': jwt,
    };
  }
}
