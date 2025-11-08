"use client";

import RecipeForm from "@/src/forms/recipe.form";

export default function NewRecipePage() {
    return (
        <div className="flex flex-col items-center min-h-screen py-16 px-6 md:px-16 lg:px-32">

            {/* Page Header */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
                Create New Recipe
            </h1>

            {/* Form Container */}
            <div className="w-full max-w-3xl">
                <div className="bg-white/90 shadow-2xl rounded-3xl border border-gray-200 p-10 transform hover:scale-[1.02] duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Recipe Details
                    </h2>
                    <RecipeForm />
                </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-tr from-purple-300 to-indigo-400 rounded-full opacity-20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-16 w-56 h-56 bg-gradient-to-tr from-pink-300 to-yellow-300 rounded-full opacity-20 blur-3xl pointer-events-none" />
        </div>
    );
}
