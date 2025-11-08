"use client";

import MyModal from "@/src/components/common/Modal";
import RegistrationForm from "@/src/forms/registration.form";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: IProps) {
    return (
        <MyModal isOpen={isOpen} onClose={onClose} title={'Create Account'}>
            <RegistrationForm onClose={onClose}/>
        </MyModal>
    )
}