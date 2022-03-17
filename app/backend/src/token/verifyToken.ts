import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import { IVerify } from '../interfaces/tokenInterfaces';

const JWTKEY = 'jwt.evaluation.key';

const verifyToken = async (token: string) => {
  const SECRET = await fs.readFile(JWTKEY, 'utf-8');

  const payload = jwt.verify(token, SECRET) as IVerify;

  return payload;
};

export default verifyToken;
