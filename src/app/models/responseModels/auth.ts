import { Response } from "../../service/Response";
import { User } from "../auth";

export interface UserResponse extends Response {
  user: User;
}

export interface AuthModel {
  isAuthenticated: boolean;
  access: string;
  refresh: string;
}

export interface JWTResponse extends Response {
  access: string;
  refresh: string;
  isAuthenticated: boolean;
}

export interface RegisterResponse extends Response {
  message: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  re_password: string;
}
