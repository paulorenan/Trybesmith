export interface User {
  username: string;
  classe: string;
  level: number;
  password: string;
} 

export interface IUser {
  id: number;
  username: string;
  classe: string;
  level: number;
  password: string;
}

export interface UserId {
  id: number;
  username: string;
}

export interface UserCreate {
  id: number;
  status: number;
  message: string;
}