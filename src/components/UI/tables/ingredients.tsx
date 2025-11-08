"use client";

import { useIngredientStore } from '@/src/store/ingredient.store';
import {useAuthStore} from '@/src/store/auth.store';
import {Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from '@heroui/react';
import {CATEGORY_OPTIONS, UNIT_OPTIONS} from '@/constants/select-options';

export default function IngredientsTable() {
    const { ingredients, isLoading, removeIngredient } = useIngredientStore();
    const { isAuth } = useAuthStore();

    const handleDelete = async (id: string) => {
        await removeIngredient(id)
    }
    const getCategoryLabel = (value: string) => {
        const option = CATEGORY_OPTIONS.find(option => option.value === value);
        return option ? option.label : value
    }
    const getUnitLabel = (value: string) => {
        const unit = UNIT_OPTIONS.find(unit => unit.value === value);
        return unit ? unit.label : value
    }

    return !isLoading && isAuth ? (
        <Table
            aria-label="Ingredients"
            classNames={{
                wrapper: 'mt-4 bg-white/90 backdrop-blur-md rounded-xl shadow-sm',
                table: 'w-full',
                th: 'text-black',
                td: 'text-black'
            }}
        >

            <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Category</TableColumn>
                <TableColumn>Type</TableColumn>
                <TableColumn>Price Per Unit</TableColumn>
                <TableColumn>Description</TableColumn>
                <TableColumn>Action</TableColumn>
            </TableHeader>

            <TableBody>
                {ingredients.map(( ingredient) => (
                    <TableRow key={ingredient.id}>
                        <TableCell>{ingredient.name}</TableCell>
                        <TableCell>{ getCategoryLabel(ingredient.category) }</TableCell>
                        <TableCell>{ getUnitLabel(ingredient.unit) }</TableCell>
                        <TableCell>
                            {
                                ingredient.pricePerUnit !== null ? `${ingredient.pricePerUnit} $` : '-'
                            }
                        </TableCell>
                        <TableCell>{ingredient.description || '-'}</TableCell>

                        <TableCell>
                            <Button
                                className="px-6 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-all"
                                size='sm'
                                onPress={() => handleDelete(ingredient.id.toString())}
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

        </Table>
    ) : (
        <p className='mt-4'>
            Unauthenticated
        </p>
    )
}