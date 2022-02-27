import { Request, Response } from 'express';
import { User } from 'src/user/model/user.schema';

type Ctx = {
  req: Request & { user?: Pick<User, 'username' | 'fullname' | 'role'> };
  res: Response;
};

export default Ctx;
