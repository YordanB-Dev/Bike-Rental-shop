// @ts-expect-error.
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userRepository from "./userRepository";
import AppError from "../AppError";

interface User {
    id: number, 
    email: string,
    password: string,
    username: string;
}

const register = async (email: string, password: string, username: string) => {
    if (!email?.trim() || !password?.trim() || !username?.trim()) {
        throw new Error(`Missing required fileds`);
    }

    const existingUser = await userRepository.findUSerByEmail(email);
    if (existingUser) {
        throw new AppError(`Email already in user`, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser(email, hashedPassword, username);

    return {
        id: user.id,
        email: user.email
    };
};

const login = async (email: string, password: string) => {
    const user = await userRepository.findUSerByEmail(email);
    if (!user) {
        throw new AppError(`Invlaid user`, 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError(`Invlaid password`, 400);
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new AppError(`JWT_SECRET is no longer defined`, 400);
    }

    const token = jwt.sign(
        {id: user.id, email: user.email},
        secret,
        {expiresIn: `12h`}
    );

    return {
        token,
        user: {id: user.id, email: user.email}
    };
};

export default {
    register,
    login
};