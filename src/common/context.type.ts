import { Request, Response } from 'express';
import { User } from 'src/user/model/user.schema';

type Ctx = {
  req: Request & { user?: Pick<User, 'username' | 'fullname'> };
  res: Response;
};

export default Ctx;
