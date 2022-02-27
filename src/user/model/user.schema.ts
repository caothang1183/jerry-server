import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { Role } from 'src/role/model/role.schema';

@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true, unique: true })
  @Field()
  username: string;

  @Prop({ required: true, unique: true })
  @Field()
  email: string;

  @Prop({ required: true })
  @Field()
  fullname: string;

  @Prop({ required: true })
  @Field()
  password: string;

  @Prop({ required: true })
  @Field()
  confirmToken: string;

  @Prop({ required: true, default: false })
  @Field()
  active: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Role.name })
  @Field(() => Role, { nullable: true })
  role?: Role | string;

  comparePassword: (candicatePassword: string) => boolean;
}

export type UserDocument = User & mongoose.Document;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 });

UserSchema.pre('save', async function (next: any) {
  const user = this as UserDocument;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  const user = this as UserDocument;
  return await bcrypt
    .compare(candidatePassword, user.password)
    .catch((e) => {
      console.log(e.message);
      return false;
    });
};
