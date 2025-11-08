"use server";

// Make sure this import path matches your prisma client file (e.g., db.ts)
import prisma from "@/src/utils/prisma";

export async function getRecipes() {
    try {
        const recipes = await prisma.menu.findMany({
            include: {
                ingredients: {
                    include: {
                        ingredient: true
                    }
                }
            }
        });

        return { success: true, recipes };
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return { success: false, error: "Ошибка при загрузке рецептов" };
    }
}

export async function createRecipe(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const imageUrl = formData.get("imageUrl") as string | null;

        const ingredients = Array.from(formData.entries())
            .filter(([key]) => key.startsWith("ingredient_"))
            .map(([key, value]) => ({
                ingredientId: value as string,
                quantity: parseFloat(
                    formData.get(`quantity_${key.split("_")[1]}`) as string
                )
            }));

        if (!name || ingredients.length === 0) {
            return {
                success: false,
                error: "Имя и хотя бы один ингредиент обязательны"
            };
        }

        const recipe = await prisma.menu.create({
            data: {
                name,
                description,
                imageUrl,
                ingredients: {
                    create: ingredients.map(({ ingredientId, quantity }) => ({
                        // FIX: Convert ingredientId from String to Int
                        ingredient: { connect: { id: parseInt(ingredientId, 10) } },
                        quantity
                    }))
                }
            },
            include: {
                ingredients: {
                    include: {
                        ingredient: true
                    }
                }
            }
        });

        return { success: true, recipe };
    } catch (error) {
        console.error("Error creating recipe:", error);
        return { success: false, error: "Ошибка при создании рецепта" };
    }
}

export async function updateRecipe(id: string, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const imageUrl = formData.get("imageUrl") as string | null;

        const ingredients = Array.from(formData.entries())
            // <-- SYNTAX FIX: Changed 'to' to '=>'
            .filter(([key]) => key.startsWith("ingredient_"))
            .map(([key, value]) => ({
                ingredientId: value as string,
                quantity: parseFloat(
                    formData.get(`quantity_${key.split("_")[1]}`) as string
                )
            }));

        if (!name || ingredients.length === 0) {
            return {
                success: false,
                error: "Имя и хотя бы один ингредиент обязательны"
            };
        }

        const recipe = await prisma.menu.update({
            // FIX: Convert the recipe 'id' (which is a string) to an Int
            where: { id: parseInt(id, 10) },
            data: {
                name,
                description,
                imageUrl,
                ingredients: {
                    deleteMany: {},
                    create: ingredients.map(({ ingredientId, quantity }) => ({
                        // FIX: Convert ingredientId from String to Int
                        ingredient: { connect: { id: parseInt(ingredientId, 10) } },
                        quantity
                    }))
                }
            },
            include: {
                ingredients: {
                    include: {
                        ingredient: true
                    }
                }
            }
        });

        return { success: true, recipe };
    } catch (error) {
        console.error("Error updating recipe:", error);
        return { success: false, error: "Ошибка при обновлении рецепта" };
    }
}

export async function deleteRecipe(id: string) {
    try {
        // FIX: Convert the recipe 'id' (which is a string) to an Int
        const recipeIdInt = parseInt(id, 10);

        await prisma.recipeIngredient.deleteMany({
            where: { recipeId: recipeIdInt }
        });

        await prisma.menu.delete({
            where: { id: recipeIdInt }
        });

        return { success: true };
    } catch (error) {
        console.error("Error deleting recipe:", error);
        return { success: false, error: "Ошибка при удалении рецепта" };
    }
}