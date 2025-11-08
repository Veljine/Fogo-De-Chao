import bcryptjs from "bcryptjs";

export async function saltAndHashPassword(password: string): Promise<string> {
    return await bcryptjs.hash(password, 12);
}