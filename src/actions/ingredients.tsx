"use server";

import prisma from '@/src/utils/prisma';
import { ingredientSchema } from '@/src/schema/zod';
import { ZodError } from 'zod';
import { IIngredient } from "@/src/types/ingredient";

// Adjusted IIngredient interface (should have id: number)
export interface FailureResult {
    success: false;
    error: string | unknown;
}

export interface IngredientSuccessResult {
    success: true;
    ingredient: IIngredient;
}

export interface IngredientsListSuccessResult {
    success: true;
    ingredients: IIngredient[];
}

export type CreateIngredientResult = IngredientSuccessResult | FailureResult;
export type GetIngredientsResult = IngredientsListSuccessResult | FailureResult;
export type DeleteIngredientResult = IngredientSuccessResult | FailureResult;

export async function createIngredient(data: FormData): Promise<CreateIngredientResult> {
    try {
        const NewData = {
            name: data.get("name") as string,
            category: data.get("category") as string,
            unit: data.get("unit") as string,
            pricePerUnit: data.get("pricePerUnit") ? Number(data.get("pricePerUnit")) : null,
            description: data.get("description") as string,
        };

        const validatedNewData = ingredientSchema.parse(NewData);

        // Prisma returns id as number → ensure IIngredient uses number
        const ingredient: IIngredient = await prisma.ingredient.create({
            data: {
                name: validatedNewData.name,
                category: validatedNewData.category,
                unit: validatedNewData.unit,
                pricePerUnit: validatedNewData.pricePerUnit,
                description: validatedNewData.description,
            },
        });

        return { success: true, ingredient };
    } catch (e) {
        if (e instanceof ZodError) {
            return { success: false, error: e.message };
        }
        console.error(e);
        return { success: false, error: e };
    }
}

export async function getIngredients(): Promise<GetIngredientsResult> {
    try {
        const ingredients: IIngredient[] = await prisma.ingredient.findMany();
        return { success: true, ingredients };
    } catch (e) {
        console.error('An error occurred while getting the ingredients', e);
        return { success: false, error: e };
    }
}

export async function deleteIngredient(id: number): Promise<DeleteIngredientResult> {
    try {
        const ingredient: IIngredient = await prisma.ingredient.delete({
            where: { id },
        });

        return { success: true, ingredient };
    } catch (e) {
        console.error('An error occurred while deleting the ingredient', e);
        return { success: false, error: e };
    }
}
