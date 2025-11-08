import * as z from "zod";

export const signInSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),

    password: z
        .string()
        .min(1, { message: "Password is required" })
        .max(32),
});

export const ingredientSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    category: z.enum([
        'VEGETABLES',
        'FRUITS',
        'MEAT',
        'DAIRY',
        'SPICES',
        'OTHER'
    ]),

    unit: z.enum(['GRAMS', 'KILOGRAMS', 'LITERS', 'MILLILITERS', 'PIECES']),
    pricePerUnit: z.number({ message: 'Price must be a number' })
        .min(0, 'Price must be greater than 0')
        .nullable(),
    description: z.string().optional()
})