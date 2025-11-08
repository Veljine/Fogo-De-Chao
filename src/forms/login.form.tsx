"use client";

import React, { useState } from "react";
import {Form, Input, Button} from "@heroui/react";
import {signInWithCredentials} from "@/src/actions/signIn";

interface IProps {
    onClose: () => void;
}

export default function LoginForm( {onClose}: IProps ) {

    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await signInWithCredentials(data.email, data.password);

        onClose()
        window.location.reload();
    }

    return (
        <Form
            className="w-full max-w-xs flex flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <Input
                autoComplete="email"
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
                autoComplete="password"
                validate={ value => {
                    if(!value) return 'Password is required!';
                    return null;
                }}
            />

            <div className="flex gap-2">
                <Button color="primary" type="submit">
                    Login
                </Button>
                <Button type="reset" variant="flat" onPress={onClose}>
                    Close
                </Button>
            </div>
        </Form>
    )
}