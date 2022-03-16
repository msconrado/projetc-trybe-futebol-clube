import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';

interface ISecret {
  id: number;
  username: string;
}

const JWTKEY = 'jwt.evaluation.key';

const createToken = async (info: ISecret) => {
  const jwtConfig: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };

  const SECRET = await fs.readFile(JWTKEY, 'utf-8');

  const token = jwt.sign(info, SECRET, jwtConfig);

  return token;
};

export default createToken;
