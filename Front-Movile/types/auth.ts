export type AuthUser = {
  email: string;
  password: string;
};

export type AuthForm = {
  email: string;
  password: string;
};

export type AuthResult = {
  success: boolean;
  message: string;
};
