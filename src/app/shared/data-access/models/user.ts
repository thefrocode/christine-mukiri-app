export interface User {
  usrId: number;
  usrFirstname: string;
  usrLastname: string;
  usrUsername: string;
}
export interface AuthCredentials {
  username: string;
  password: string;
}
export interface AuthenticatedUser {
  payload: any;
  token: string;
}

export interface AuthState {
  user: AuthenticatedUser | undefined;
  status: 'pending' | 'authenticating' | 'success' | 'error';
  error: any;
}

export interface UsersState {
  users: User[];
  status: 'pending' | 'loading' | 'success' | 'error';
  error: string;
}
