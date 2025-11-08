"use client";

import RecipeCard from "@/src/components/common/RecipeCard";
import { useRecipeStore } from "@/src/store/recipe.store";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function Home() {
    const { recipes, isLoading, error } = useRecipeStore();

    return (
        <section
            id="home-recipes"
            className="font-sans text-gray-800"
        >
            <div className="max-w-[980px] mx-auto my-12 p-7 bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-lg">

                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Your Recipes</h1>
                    <Link href="/menu/new">
                        <Button
                            color="primary"
                            className="bg-gray-800 text-white px-5 py-2 rounded-lg font-medium hover:scale-105 transition-transform"
                        >
                            Add recipe
                        </Button>
                    </Link>
                </header>

                {error && (
                    <p className="text-red-500 mb-6 text-center font-medium">{error}</p>
                )}

                {isLoading && (
                    <p className="text-gray-500 mb-6 text-center">Loading...</p>
                )}

                <div className="overflow-x-auto py-2">
                    <div className="flex space-x-4 snap-x snap-mandatory">
                        {recipes.map((recipe) => (
                            <div
                                key={recipe.id}
                                className="snap-start flex-shrink-0 w-64 sm:w-72 lg:w-80"
                            >
                                <RecipeCard recipe={recipe} />
                            </div>
                        ))}
                    </div>
                </div>

                {!isLoading && recipes.length === 0 && !error && (
                    <p className="text-gray-500 text-center mt-12">
                        No recipes yet, add a new recipe!
                    </p>
                )}

                <footer className="mt-8 flex justify-between items-center text-sm text-gray-500">
                    <span>Recipe App</span>
                    <span>Updated 2025</span>
                </footer>
            </div>
        </section>
    );
}
