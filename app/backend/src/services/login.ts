import UserModel from '../database/models/UserModel';

interface IUser {
  email: string,
  password: string,
}

const login = async ({ email, password }: IUser) => {
  const [user] = await UserModel.findAll({ where: { email, password } });

  return user;
};

export default { login };
