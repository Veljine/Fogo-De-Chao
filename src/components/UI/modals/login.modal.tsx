"use client";

import MyModal from "@/src/components/common/Modal";
import LoginForm from "@/src/forms/login.form";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: IProps) {
    return (
        <MyModal isOpen={isOpen} onClose={onClose} title={'Log In'}>
            <LoginForm onClose={onClose}/>
        </MyModal>
    )
}