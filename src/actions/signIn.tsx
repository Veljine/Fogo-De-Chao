"use server";

import {signIn} from "@/src/auth/auth";

export async function signInWithCredentials(email: string, password: string) {
    try {
        const res = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false
        });

        return res;

    } catch (error) {
        console.error('Unknown Error while logging in: ', error);
        return { success: false, error: "An unexpected error occurred." };
    }
}