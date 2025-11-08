export interface IIngredient {
    id: number;
    name: string;
    category: string;
    unit: string;
    pricePerUnit: number | null;
    description: string | null;

    createdAt?: Date;
    updatedAt?: Date;
}