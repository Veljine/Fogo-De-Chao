"use client";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
} from "@heroui/react";

import { ReactNode } from "react";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function MyModal({
isOpen,
onClose,
title,
children,
size = 'xs'
}: IProps) {

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={size}>
                <ModalContent>
                            <ModalHeader className="flex flex-col gap-1 text-black" >
                                {title}
                            </ModalHeader>
                            <ModalBody>
                                {children}
                            </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
