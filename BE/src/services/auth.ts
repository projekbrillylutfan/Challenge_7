import { LoginRequest, RegisterRequest } from "../models/dto/auth";
import { Auth } from "../models/entity/auth";
import { ErrorResponse } from "../models/entity/default";
import { User } from "../models/entity/user";
import UserRepository from "../repositories/userRepo";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const SALT_ROUND = 10;

class AuthService {
  static async login(req: LoginRequest): Promise<Auth | ErrorResponse> {
    try {
      if (!req.email) throw new Error('email cannot be empty');
      if (!req.password) throw new Error('password cannot be empty');
      if (req.password.length < 8)
        throw new Error('password length should be more than 8');

      const user = await UserRepository.getUserByEmail(req.email);

      if (!user) {
        throw new Error('User tidak ditemukan');
      }
      
      const isPasswordCorrect = bcrypt.compareSync(req.password, user.password as string);

      if (!isPasswordCorrect) {
        throw new Error('Password Salah!!!!!!!!!!');
      }

      const jwtSecret = "RAHASIAMUEHEHEH";
      const jwtExpireTime = "24h";

      const token = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
      }, jwtSecret,
      {
        expiresIn: jwtExpireTime,
      });

      const authToken: Auth = {
        access_token: token,
      }

      return authToken;
    } catch (error: any) {
      const errorResponse: ErrorResponse = {
        httpCode: 400,
        message: error.message,
      };

      return errorResponse;
    }
  }

  static async register(req: RegisterRequest): Promise<User | ErrorResponse> {
    try {
      const user = await UserRepository.getUserByEmail(req.email);

      if (user) {
        throw new Error("user sudah ada");
      } else {
        const ecryptedPassword = bcrypt.hashSync(req.password, SALT_ROUND);

        const userToCreate: User = {
          username: req.username,
          email: req.email,
          password: ecryptedPassword,
          role: "member",
        };
        const createdUser = await UserRepository.createUserRegister(userToCreate);

        return createdUser;
      }
    } catch (error: any) {
      const errorResponse: ErrorResponse = {
        httpCode: 400,
        message: error.message,
      };

      return errorResponse;
    }
  }
}

export default AuthService;
