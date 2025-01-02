export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordCredentials {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  date_joined: string;
  last_login: string;
}