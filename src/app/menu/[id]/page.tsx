"use client";

import RecipeForm from "@/src/forms/recipe.form";
import { useRecipeStore } from "@/src/store/recipe.store";
import { IRecipe } from "@/src/types/recipe";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditRecipePage = () => {
    const { id } = useParams<{ id: string }>();
    const { recipes, isLoading, error } = useRecipeStore();
    const [recipe, setRecipe] = useState<IRecipe | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        if (recipes.length > 0 || error) {
            const foundRecipe = recipes.find((r) => r.id === id);
            setRecipe(foundRecipe || null);
            setHasSearched(true);
        }
    }, [recipes, id, error]);

    if (isLoading)
        return <p className="text-center text-black mt-16">Loading...</p>;
    if (error)
        return <p className="text-center text-red-600 mt-16">{error}</p>;
    if (hasSearched && !recipe)
        return (
            <p className="text-center text-red-600 mt-16">Recipe not found</p>
        );

    return recipe ? (
        <div className="min-h-screen flex flex-col items-center py-16 px-4 md:px-16 lg:px-32">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-black mb-2">
                    Edit Recipe
                </h1>
                <p className="text-black/80 text-lg">
                    Update your recipe details below
                </p>
            </div>

            {/* Form Container */}
            <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-10 border border-gray-200 transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-2xl font-bold text-black mb-6 text-center">
                    {recipe.name}
                </h2>
                <RecipeForm initialRecipe={recipe} />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-16 left-10 w-40 h-40 bg-gradient-to-tr from-purple-300 to-indigo-400 rounded-full opacity-20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-16 w-56 h-56 bg-gradient-to-tr from-pink-300 to-yellow-300 rounded-full opacity-20 blur-3xl pointer-events-none" />
        </div>
    ) : null;
};

export default EditRecipePage;
