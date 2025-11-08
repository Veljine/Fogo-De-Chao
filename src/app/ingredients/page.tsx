"use client";

import IngredientForm from "@/src/forms/ingredient.form";
import IngredientsTable from "@/src/components/UI/tables/ingredients";

export default function Ingredients() {
    return (
        <div className="relative min-h-screen w-full py-16 px-6 md:px-16 lg:px-32 space-y-12 overflow-hidden">

            {/* Page Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                    Manage Ingredients
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                    Add new ingredients and see your list update in real-time
                </p>
            </div>

            {/* Form Section */}
            <div className="relative z-10">
                <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-10 border border-gray-200 transform hover:scale-[1.02] transition-transform duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Add New Ingredient
                    </h2>
                    <IngredientForm />
                </div>
            </div>

            {/* Table Section */}
            <div className="max-w-5xl mx-auto">
                <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl border border-gray-200 p-6 overflow-x-auto animate-fade-in">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                        Ingredients List
                    </h2>
                    <IngredientsTable />
                </div>
            </div>

            {/* Floating Decorative Circles */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-tr from-purple-300 to-indigo-400 rounded-full opacity-20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-28 -right-28 w-56 h-56 bg-gradient-to-tr from-pink-300 to-yellow-300 rounded-full opacity-20 blur-3xl pointer-events-none" />
        </div>
    );
}
