"use server";

import {signOut} from "@/src/auth/auth";

export async function signOutFunction() {
    try {
        const result: {redirect: boolean} = await signOut({ redirect: false });
        return result;
    } catch (e) {
        console.error('Error while logging out: ', e);
        throw e;
    }
}