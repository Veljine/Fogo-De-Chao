"use server";

import prisma from "@/src/utils/prisma";
import {saltAndHashPassword} from "@/src/utils/password";

export default async function registerUser(data: { email: string, password: string, confirmPassword: string } ) {
    const { email, password, confirmPassword } = data;

    if(password !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    if(password.length < 6) {
        return { error: "Password must be at least 6 characters" };
    }

    try {
        const doesExist = await prisma.user.findUnique({
            where: { email },
        })

        if(doesExist) {
            return { error: "User already exists" };
        }

        const pwHash = await saltAndHashPassword(password);
        const user: {id: string, email: string} = await prisma.user.create({
            data: {
                email: email,
                password: pwHash
            }
        })

        return user;

    } catch (error) {
        throw error;
    }
}