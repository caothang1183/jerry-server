import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateRoleInput {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}
