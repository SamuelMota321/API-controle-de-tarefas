import { injectable } from "tsyringe";
import { TUserLoginBody, TUserLoginReturn, TUserRegisterBody, TUserReturn, userReturnSchema } from "../schemas/user.schema";
import bcrypt from "bcrypt"
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";

@injectable()
export class UserServices {
    async register(body: TUserRegisterBody): Promise<TUserReturn> {
        const hashPassword = await bcrypt.hash(body.password, 10);

        const newUser = {
            ...body,
            password: hashPassword
        }

        const user = await prisma.user.create({ data: newUser });
        return userReturnSchema.parse(user);
    }

    async login(body: TUserLoginBody) {
        const user = await prisma.user.findFirst({ where: { email: body.email } });
        if (!user) {
            throw new AppError(404, "User not exists");
        }

        const compare = await bcrypt.compare(body.password, user.password);

        if (!compare) {
            throw new AppError(403, "Email and password doesn't match");
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET as string)
        return { accessToken: token, user: userReturnSchema.parse(user) };
    }

    async getUser(id: number): Promise<TUserReturn> {
        const user = await prisma.user.findFirst({ where: { id } });
        return userReturnSchema.parse(user);
    }
}