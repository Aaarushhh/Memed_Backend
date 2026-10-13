import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import config from "../../config";
import UserModel from "../../model/user.model";
import { CustomError } from "../../util/helper/customError";
import { generateJwtToken } from "../../util/helper/generateJwtToken";
import { HttpStatusCode } from "../../util/enum/common.enum";
import { ExtendedRequest } from "../../util/interface/common.interface";

class AuthController {
  signup: RequestHandler = async (req, res, next) => {
    const { name, email, password, role } = req.body;
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return next(
          new CustomError(
            "User with this email already exists",
            HttpStatusCode.CONFLICT
          )
        );
      }

      const user = await UserModel.create({
        name,
        email,
        password: await bcrypt.hash(
          password,
          config.commonConfig.bcryptSaltRounds
        ),
        role,
      });

      const payload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      };

      res.status(HttpStatusCode.CREATED).json({
        data: {
          token: generateJwtToken(payload),
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        message: "Account created successfully",
      });
    } catch (error) {
      console.error("Error in signup:", error);
      next(
        new CustomError(
          "Unable to create account. Please try again later.",
          HttpStatusCode.SERVICE_UNAVAILABLE
        )
      );
    }
  };

  login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email }).select("+password");
      if (!user) {
        return next(
          new CustomError(
            "Invalid email or password",
            HttpStatusCode.UNAUTHORIZED
          )
        );
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return next(
          new CustomError(
            "Invalid email or password",
            HttpStatusCode.UNAUTHORIZED
          )
        );
      }

      const payload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      };

      res.status(HttpStatusCode.OK).json({
        data: {
          token: generateJwtToken(payload),
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        message: "Login successful",
      });
    } catch (error) {
      console.error("Error in login:", error);
      next(
        new CustomError(
          "Unable to login. Please try again later.",
          HttpStatusCode.SERVICE_UNAVAILABLE
        )
      );
    }
  };

  me: RequestHandler = async (req: ExtendedRequest, res, next) => {
    try {
      const user = await UserModel.findById(req.user!.userId);
      if (!user) {
        return next(
          new CustomError("User not found", HttpStatusCode.NOT_FOUND)
        );
      }

      res.status(HttpStatusCode.OK).json({
        data: {
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        message: "User fetched successfully",
      });
    } catch (error) {
      console.error("Error in me:", error);
      next(
        new CustomError(
          "Unable to fetch user. Please try again later.",
          HttpStatusCode.SERVICE_UNAVAILABLE
        )
      );
    }
  };
}

export default new AuthController();
