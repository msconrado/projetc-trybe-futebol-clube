export interface ISecret {
  email: string;
  username: string;
  role: string;
}

export interface IVerify {
  email: string;
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}
