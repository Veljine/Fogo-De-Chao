"use client";

import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/constants/select-options";
import { useIngredientStore } from "@/src/store/ingredient.store";
import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { useState, useTransition } from "react";

const initialState = {
    name: "",
    category: "",
    unit: "",
    pricePerUnit: null as number | null,
    description: ""
};

const IngredientForm = () => {
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState(initialState);
    const { addIngredient } = useIngredientStore();
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            await addIngredient(formData);
            const storeError = useIngredientStore.getState().error;

            if (storeError) {
                setError(storeError);
            } else {
                setError(null);
                setFormData(initialState);
            }
        });
    };

    return (
        <Form
            className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-6"
            action={handleSubmit}
        >
            {error && <p className="text-red-500 text-center font-medium">{error}</p>}

            <Input
                isRequired
                name="name"
                placeholder="Enter ingredient name"
                type="text"
                value={formData.name}
                classNames={{
                    inputWrapper:
                        "bg-gray-100 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-gray-400",
                    input: "text-gray-900 text-sm"
                }}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                validate={(value) => (!value ? "Name is required" : null)}
            />

            <div className="flex gap-4">
                <Select
                    isRequired
                    name="category"
                    placeholder="Category"
                    selectedKeys={formData.category ? [formData.category] : []}
                    classNames={{
                        trigger:
                            "bg-gray-100 rounded-xl w-full px-4 py-2 focus-within:ring-2 focus-within:ring-gray-400 text-gray-900 text-sm",
                        innerWrapper: "text-sm",
                        value: "truncate",
                        selectorIcon: "text-gray-700"
                    }}
                    onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                    }
                >
                    {CATEGORY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} className="text-gray-900">
                            {option.label}
                        </SelectItem>
                    ))}
                </Select>

                <Select
                    isRequired
                    name="unit"
                    placeholder="Unit"
                    selectedKeys={formData.unit ? [formData.unit] : []}
                    classNames={{
                        trigger:
                            "bg-gray-100 rounded-xl w-full px-4 py-2 focus-within:ring-2 focus-within:ring-gray-400 text-gray-900 text-sm",
                        innerWrapper: "text-sm",
                        value: "truncate",
                        selectorIcon: "text-gray-700"
                    }}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                >
                    {UNIT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} className="text-gray-900">
                            {option.label}
                        </SelectItem>
                    ))}
                </Select>

                <Input
                    isRequired
                    name="pricePerUnit"
                    placeholder="Price"
                    type="number"
                    value={
                        formData.pricePerUnit !== null ? formData.pricePerUnit.toString() : ""
                    }
                    classNames={{
                        inputWrapper:
                            "bg-gray-100 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-gray-400 relative",
                        input: "text-gray-900 text-sm"
                    }}
                    onChange={(e) => {
                        const value = e.target.value ? parseFloat(e.target.value) : null;
                        setFormData({ ...formData, pricePerUnit: value });
                    }}
                    endContent={
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
              $
            </span>
                    }
                    validate={(value) => {
                        if (!value) return "Price is required";
                        const num = parseFloat(value);
                        if (isNaN(num) || num < 0) return "Price must be positive";
                        return null;
                    }}
                />
            </div>

            <Input
                name="description"
                placeholder="Enter description (optional)"
                type="text"
                value={formData.description}
                classNames={{
                    inputWrapper:
                        "bg-gray-100 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-gray-400",
                    input: "text-gray-900 text-sm"
                }}
                onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                }
            />

            <div className="flex justify-end">
                <Button
                    type="submit"
                    isLoading={isPending}
                    className="bg-black text-white hover:bg-gray-900"
                >
                    Add Ingredient
                </Button>
            </div>
        </Form>
    );
};

export default IngredientForm;
