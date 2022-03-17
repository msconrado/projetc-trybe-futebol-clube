import * as bcrypt from 'bcryptjs';
import createToken from '../token/createToken';
import UserModel from '../database/models/UserModel';
import { IUser } from '../interfaces/loginInterfaces';

const login = async ({ email, password }: IUser) => {
  const user = await UserModel.findOne({ where: { email } });

  if (!user) {
    return false;
  }

  const crypt = bcrypt.compareSync(password, user.password);

  if (!crypt) return false;

  const token = await createToken({ email, username: user.username, role: user.role });

  const returnUser = {
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    },
    token,
  };

  return returnUser;
};

export default { login };
