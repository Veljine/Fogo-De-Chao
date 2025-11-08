import { NextResponse } from "next/server";
import prisma from "@/src/utils/prisma";
import { ingredientSchema } from "@/src/schema/zod";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validated = ingredientSchema.parse(body);

        const ingredient = await prisma.ingredient.create({
            data: validated,
        });

        return NextResponse.json({ success: true, ingredient });
    } catch (error) {
        console.error("Error creating ingredient:", error);
        return NextResponse.json(
            { success: false, error: String(error) },
            { status: 500 }
        );
    }
}
