import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/model/user.schema';

@Schema()
@ObjectType()
export class Role {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop()
  @Field({nullable: true})
  description?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field(() => [User])
  users: User[];

  isAdministrator: () => boolean;
}

export type RoleDocument = Role & mongoose.Document;

export const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.index({ name: 1 });

RoleSchema.methods.isAdministrator = function () {
  const role = this as RoleDocument;
  if (role.name.match("Admin")) return true;
  return false;
};
