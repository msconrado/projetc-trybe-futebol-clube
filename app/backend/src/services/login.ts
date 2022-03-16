import * as bcrypt from 'bcryptjs';
import createToken from '../token/createToken';
import UserModel from '../database/models/UserModel';

interface IUser {
  email: string;
  password: string;
}

const login = async ({ email, password }: IUser) => {
  const user = await UserModel.findOne({ where: { email } });

  if (!user) {
    return { message: 'Não encontrado!!' };
  }

  const crypt = bcrypt.compareSync(password, user.password);

  if (!crypt) return { message: 'Password invalido!' };

  const token = await createToken({ id: user.id || 1, username: user.username });

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
