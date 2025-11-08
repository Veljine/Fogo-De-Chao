import {
    createRecipe,
    deleteRecipe,
    getRecipes,
    updateRecipe
} from "@/src/actions/recipe";
import { IRecipe, IRecipeIngredient } from "@/src/types/recipe";
import { create } from "zustand";

interface IActionResult {
    success: boolean;
    recipe?: IRecipe;
    error?: string;
}

interface IRecipeState {
    recipes: IRecipe[];
    isLoading: boolean;
    error: string | null;
    loadRecipes: () => Promise<void>;
    addRecipe: (formData: FormData) => Promise<IActionResult>;
    updateRecipe: (id: string, formData: FormData) => Promise<IActionResult>;
    removeRecipe: (id: string) => Promise<void>;
}

// Helper: normalize recipe and ingredient IDs to string
const normalizeRecipe = (recipe: any): IRecipe => ({
    ...recipe,
    id: recipe.id.toString(),
    ingredients: recipe.ingredients.map((ing: any): IRecipeIngredient => ({
        ...ing,
        id: ing.id.toString(),
        ingredientId: ing.ingredientId.toString(),
        recipeId: ing.recipeId.toString(),
        ingredient: {
            ...ing.ingredient,
            id: ing.ingredient.id.toString()
        }
    }))
});

export const useRecipeStore = create<IRecipeState>((set) => ({
    recipes: [],
    isLoading: false,
    error: null,

    loadRecipes: async () => {
        set({ isLoading: true, error: null });
        try {
            const result = await getRecipes();
            if (result.success) {
                // @ts-ignore
                const recipes = result.recipes.map(normalizeRecipe);
                set({ recipes, isLoading: false });
            } else {
                set({ error: result.error, isLoading: false });
            }
        } catch (error) {
            console.error("error", error);
            set({ error: "Ошибка при загрузке рецептов", isLoading: false });
        }
    },

    addRecipe: async (formData: FormData) => {
        set({ error: null });
        try {
            const result = await createRecipe(formData);
            if (result.success && result.recipe) {
                const recipe = normalizeRecipe(result.recipe);
                set((state) => ({
                    recipes: [...state.recipes, recipe],
                    isLoading: false
                }));
                return { success: true, recipe };
            } else {
                set({ error: result.error, isLoading: false });
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error("error", error);
            set({ error: "Error while adding a recipe", isLoading: false });
            return { success: false, error: "Error while adding the recipe" };
        }
    },

    updateRecipe: async (id: string, formData: FormData) => {
        set({ error: null });
        try {
            const result = await updateRecipe(id, formData);
            if (result.success && result.recipe) {
                const updatedRecipe = normalizeRecipe(result.recipe);
                set((state) => ({
                    recipes: state.recipes.map((r) =>
                        r.id === id ? updatedRecipe : r
                    ),
                    isLoading: false
                }));
                return { success: true, recipe: updatedRecipe };
            } else {
                set({ error: result.error, isLoading: false });
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error("error", error);
            set({ error: "Error while updating a recipe", isLoading: false });
            return { success: false, error: "Error while updating the recipe" };
        }
    },

    removeRecipe: async (id: string) => {
        set({ error: null });
        try {
            const result = await deleteRecipe(id);
            if (result.success) {
                set((state) => ({
                    recipes: state.recipes.filter((r) => r.id !== id),
                    isLoading: false
                }));
            } else {
                set({ error: result.error, isLoading: false });
            }
        } catch (error) {
            console.error("error", error);
            set({ error: "Error while deleting the recipe", isLoading: false });
        }
    }
}));
