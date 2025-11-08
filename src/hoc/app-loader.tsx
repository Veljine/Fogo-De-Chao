"use client";

import { useAuthStore } from "@/src/store/auth.store"
import {useSession} from 'next-auth/react';
import React, {useEffect} from 'react';
import {useIngredientStore} from '@/src/store/ingredient.store';
import {useRecipeStore} from '@/src/store/recipe.store';

interface IProps {
    children: React.ReactNode;
}

export const AppLoader = ({ children }: IProps) => {
    const { data: session, status } = useSession();
    const { setAuthState, isAuth } = useAuthStore();
    const { loadIngredients } = useIngredientStore()
    const { loadRecipes } = useRecipeStore()

    useEffect(() => {
        setAuthState(status, session)
    }, [status, session, setAuthState]);

    useEffect(() => {

        if(isAuth) {
            loadIngredients()
        }

    }, [isAuth, loadIngredients]);

    useEffect(() => {
        loadRecipes();
    }, [loadRecipes]);

    return <> {children} </>
}