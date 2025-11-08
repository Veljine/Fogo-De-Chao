"use client";

import { useState, useTransition, useEffect } from "react";
import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { useIngredientStore } from "@/src/store/ingredient.store";
import { useRecipeStore } from "@/src/store/recipe.store";
import { IRecipe } from "@/src/types/recipe";
import { useRouter } from "next/navigation";

interface RecipeFormProps {
    initialRecipe?: IRecipe;
}

interface IIngredientField {
    id: number;
    ingredientId: string;
    quantity: number | null;
}

const initialState = {
    name: "",
    description: "",
    imageUrl: ""
};

const RecipeForm = ({ initialRecipe }: RecipeFormProps) => {
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: initialRecipe?.name || initialState.name,
        description: initialRecipe?.description || initialState.description,
        imageUrl: initialRecipe?.imageUrl || initialState.imageUrl
    });

    const [ingredientFields, setIngredientFields] = useState<IIngredientField[]>(
        initialRecipe?.ingredients
            ? initialRecipe.ingredients.map((ing, index) => ({
                id: index,
                ingredientId: ing.ingredientId,
                quantity: ing.quantity
            }))
            : [{ id: 0, ingredientId: "", quantity: null }]
    );

    const { ingredients, loadIngredients } = useIngredientStore();
    const { addRecipe, updateRecipe } = useRecipeStore();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    useEffect(() => {
        if (ingredients.length === 0) loadIngredients();
    }, [ingredients.length, loadIngredients]);

    const handleAddIngredientField = () => {
        if (ingredientFields.length < 10) {
            setIngredientFields([
                ...ingredientFields,
                { id: ingredientFields.length, ingredientId: "", quantity: null }
            ]);
        }
    };

    const handleRemoveIngredientField = (id: number) => {
        if (ingredientFields.length > 1) {
            setIngredientFields(ingredientFields.filter((f) => f.id !== id));
        }
    };

    const handleIngredientChange = (
        id: number,
        field: keyof IIngredientField,
        value: string | number | null
    ) => {
        setIngredientFields(
            ingredientFields.map((f) => (f.id === id ? { ...f, [field]: value } : f))
        );
    };

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            setError(null);

            const result = initialRecipe
                ? await updateRecipe(initialRecipe.id, formData)
                : await addRecipe(formData);

            if (result.success) {
                setIngredientFields([{ id: 0, ingredientId: "", quantity: null }]);
                router.push("/");
                setFormData(initialState);
            } else {
                setError(result.error || "Error saving recipe.");
            }
        });
    };

    return (
        <Form
            className="w-[450px] bg-white/90 shadow-lg rounded-2xl p-6 border border-gray-200"
            action={handleSubmit}
        >
            {error && (
                <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            <Input
                aria-label="Recipe Name"
                isRequired
                name="name"
                placeholder="Enter recipe name"
                type="text"
                value={formData.name}
                classNames={{
                    inputWrapper: "bg-gray-100 rounded-xl focus-within:ring-2 focus-within:ring-gray-400",
                    input: "text-gray-900 text-sm"
                }}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                validate={(value) => (!value ? "Name is required" : null)}
            />

            <Input
                aria-label="Recipe Description"
                name="description"
                placeholder="Enter description (optional)"
                type="text"
                value={formData.description}
                classNames={{
                    inputWrapper: "bg-gray-100 rounded-xl focus-within:ring-2 focus-within:ring-gray-400",
                    input: "text-gray-900 text-sm"
                }}
                onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                }
            />

            <Input
                aria-label="Recipe Image"
                name="imageUrl"
                placeholder="Image URL (optional)"
                type="url"
                value={formData.imageUrl}
                classNames={{
                    inputWrapper: "bg-gray-100 rounded-xl focus-within:ring-2 focus-within:ring-gray-400",
                    input: "text-gray-900 text-sm"
                }}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />

            <div className="space-y-2 mt-4">
                {ingredientFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center">
                        <Select
                            aria-label={`Ingredient ${index + 1}`}
                            isRequired
                            name={`ingredient_${index}`}
                            placeholder="Select ingredient"
                            selectedKeys={field.ingredientId ? [field.ingredientId] : []}
                            classNames={{
                                trigger: "bg-gray-100 rounded-xl text-gray-900",
                                innerWrapper: "text-sm w-[125px]",
                                value: "truncate"
                            }}
                            onChange={(e) =>
                                handleIngredientChange(
                                    field.id,
                                    "ingredientId",
                                    e.target.value
                                )
                            }
                        >
                            {ingredients.map((ingredient) => (
                                <SelectItem key={ingredient.id} className="text-gray-900">
                                    {ingredient.name}
                                </SelectItem>
                            ))}
                        </Select>

                        <Input
                            aria-label="Ingredient Quantity"
                            isRequired
                            name={`quantity_${index}`}
                            placeholder="Quantity"
                            type="number"
                            value={field.quantity !== null ? field.quantity.toString() : ""}
                            classNames={{
                                inputWrapper:
                                    "bg-gray-100 rounded-xl focus-within:ring-2 focus-within:ring-gray-400 w-[100px]",
                                input: "text-gray-900 text-sm"
                            }}
                            className="w-[100px]"
                            onChange={(e) =>
                                handleIngredientChange(
                                    field.id,
                                    "quantity",
                                    e.target.value ? parseFloat(e.target.value) : null
                                )
                            }
                            validate={(value) =>
                                !value || parseFloat(value) <= 0
                                    ? "Quantity must be greater than 0"
                                    : null
                            }
                        />

                        {ingredientFields.length > 1 && (
                            <Button
                                color="danger"
                                variant="flat"
                                onPress={() => handleRemoveIngredientField(field.id)}
                                className="w-[50px] bg-red-600 text-white hover:scale-105 transition-transform"
                            >
                                -
                            </Button>
                        )}
                    </div>
                ))}

                {ingredientFields.length < 10 && (
                    <Button
                        variant="flat"
                        onPress={handleAddIngredientField}
                        className="bg-gray-700 text-white hover:scale-105 transition-transform"
                    >
                        +
                    </Button>
                )}
            </div>

            <div className="flex justify-end mt-6">
                <Button
                    type="submit"
                    isLoading={isPending}
                    className="bg-gray-800 text-white px-6 hover:scale-105 transition-transform"
                >
                    {initialRecipe ? "Save Changes" : "Add Recipe"}
                </Button>
            </div>
        </Form>
    );
};

export default RecipeForm;
