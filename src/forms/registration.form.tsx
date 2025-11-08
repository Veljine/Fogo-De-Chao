"use client";

import React, { useState } from "react";
import {Form, Input, Button} from "@heroui/react";
import registerUser from "@/src/actions/register";

interface IProps {
    onClose: () => void;
}

export default function RegistrationForm( {onClose}: IProps ) {
    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function handleSubmit(e: React.FormEvent) {

        e.preventDefault();

        const result = await registerUser(data);
        console.log(result)

        onClose()
    }

    return (
        <Form
            className="w-full max-w-xs flex flex-col gap-4 text-black"
            onSubmit={handleSubmit}
        >
            <Input
                isRequired
                errorMessage="Please enter a valid email"
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={data.email}
                onChange={ e => setData({ ...data, email: e.target.value })}
                validate={ value => {
                    if(!value) return 'Email is required!';
                    if(!validateEmail(value)) return 'Incorrect email!';
                    return null;
                }}
            />

            <Input
                isRequired
                errorMessage="Please enter a valid password"
                label="Password"
                labelPlacement="outside"
                name="password"
                placeholder="Enter your password"
                type="password"
                value={data.password}
                onChange={ e => setData({ ...data, password: e.target.value })}
                validate={ value => {
                    if(!value) return 'Password is required!';
                    if( value.length < 6) return 'Password must be at least 6 characters long!';
                    return null;
                }}
            />

            <Input
                isRequired
                errorMessage="Please enter a valid password"
                label="Password Confirmation"
                labelPlacement="outside"
                name="confirmPassword"
                placeholder="Enter your password again"
                type="password"
                value={data.confirmPassword}
                onChange={ e => setData({ ...data, confirmPassword: e.target.value })}
                validate={ value => {
                    if(!value) return 'Password for confirmation is required!';
                    if( value !== data.password) return 'Passwords do not match!';
                    return null;
                }}
            />

            <div className="flex gap-2">
                <Button color="primary" type="submit">
                    Sign up
                </Button>
                <Button type="reset" variant="flat" onPress={onClose}>
                    Close
                </Button>
            </div>
        </Form>
    )
}