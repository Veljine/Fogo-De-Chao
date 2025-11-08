"use client";

import { IRecipe } from "@/src/types/recipe";
import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import { useRecipeStore } from "@/src/store/recipe.store";
import Link from "next/link";
import { useTransition } from "react";
import Image from "next/image";
import { UNIT_ABBREVIATIONS } from "@/src/constants/select-options";
import { useAuthStore } from "@/src/store/auth.store";

interface RecipeCardProps {
    recipe: IRecipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
    const { removeRecipe } = useRecipeStore();
    const { isAuth } = useAuthStore();
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await removeRecipe(recipe.id);
            } catch (error) {
                console.error("Error deleting recipe:", error);
            }
        });
    };

    const getUnitLabel = (unit: string) => {
        const unitOption = UNIT_ABBREVIATIONS.find(
            (option) => option.value === unit
        );
        return unitOption ? unitOption.label : unit.toLowerCase();
    };

    return (
        <Card className="w-full min-w-[254px] max-w-md h-[480px] flex flex-col bg-white/90 shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition-all">
            <div className="h-48 overflow-hidden rounded-t-2xl">
                {recipe.imageUrl ? (
                    <div className="relative h-48 group overflow-hidden">
                        <Image
                            src={recipe.imageUrl}
                            alt={recipe.name}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">
                        No image available
                    </div>
                )}
            </div>

            <CardHeader className="flex justify-between items-center text-gray-900">
                <h2 className="text-xl font-bold">{recipe.name}</h2>
            </CardHeader>

            <CardBody className="flex-1 text-gray-800">
                <p className="text-gray-600 line-clamp-6">
                    {recipe.description || "No description provided."}
                </p>
                <h3 className="mt-4 font-semibold text-gray-800">Ingredients:</h3>
                <ul className="list-disc pl-5 overflow-y-auto max-h-24 text-gray-700">
                    {recipe.ingredients.map((ing) => (
                        <li key={ing.id}>
                            {ing.ingredient.name}: {ing.quantity}{" "}
                            {getUnitLabel(ing.ingredient.unit)}
                        </li>
                    ))}
                </ul>
            </CardBody>

            {isAuth && (
                <div className="flex justify-end gap-2 p-4">
                    <Link href={`/menu/${recipe.id}`}>
                        <Button
                            variant="flat"
                            className="bg-gray-700 text-white hover:scale-105 transition-transform"
                        >
                            Edit
                        </Button>
                    </Link>
                    <Button
                        variant="flat"
                        className="bg-red-600 text-white hover:scale-105 transition-transform"
                        onPress={handleDelete}
                        isLoading={isPending}
                    >
                        Delete
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default RecipeCard;
