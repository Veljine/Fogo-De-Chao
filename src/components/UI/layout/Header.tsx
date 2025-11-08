"use client";

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
import  Image from "next/image"
import {usePathname} from "next/navigation";
import {siteConfig} from "@/src/config/site.config";
import React, {JSX} from "react";
import {layoutConfig} from "@/src/config/layout.config";
import RegistrationModal from "@/src/components/UI/modals/registration.modal";
import LoginModal from "@/src/components/UI/modals/login.modal";
import {signOutFunction} from "@/src/actions/signOut";
import {useAuthStore} from '@/src/store/auth.store';

export const Logo = () => {
    return (
        <Image src={'/favicon.ico'} alt={""} width={40} height={40} />
    )
}

export default function Header() {
    const pathname: string = usePathname();
    const [isRegistrationOpen, setIsRegistrationOpen] = React.useState(false);
    const [isLoginOpen, setIsLoginOpen] = React.useState(false);
    const { isAuth, session, status, setAuthState } = useAuthStore();

    function getItems(array: { href: string; label: string }[]): JSX.Element[] {
        return (
            array.filter( item => {
                if(item.href === '/ingredients') {
                    return isAuth;
                }
                return true;
            } ).map( item => {
                const current = pathname === item.href
                return (
                    <NavbarItem key={ item.href }>
                        <Link
                            href={item.href}
                            className={`text-gray-800 font-medium transition-all duration-200 hover:text-black ${current ? 'no-underline' : ''}`}
                        >
                            {item.label}
                        </Link>
                    </NavbarItem>
                )
            } )
        )
    }

    async function handleSignOut() {
        await signOutFunction()
        setAuthState('unauthenticated', null)
        window.location.reload();
    }

    return (
        <Navbar className="bg-white/90 backdrop-blur-md shadow-sm" style={{ height: layoutConfig.headerHeight }}>
            <NavbarBrand>
                <Link href="/" className='flex gap-1 text-inherit'>
                    <Logo />
                    <p className="font-bold text-black">{siteConfig.appInfo.title}</p>
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-10" justify="center">
                { getItems(siteConfig.navItems) }
            </NavbarContent>

            <NavbarContent justify="end">
                {!isAuth ? (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Button
                                as={Link}
                                href="#"
                                variant="flat"
                                onPress={() => setIsLoginOpen(true)}
                                className="bg-black text-white hover:scale-105 transition-transform duration-200"
                            >
                                Log in
                            </Button>
                        </NavbarItem>

                        <NavbarItem>
                            <Button
                                as={Link}
                                href="#"
                                variant="flat"
                                onPress={() => setIsRegistrationOpen(true)}
                                className="bg-black text-white hover:scale-105 transition-transform duration-200"
                            >
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                ) : (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Button
                                as={Link}
                                href="/"
                                variant="flat"
                                onPress={handleSignOut}
                                className="bg-black text-white hover:scale-105 transition-transform duration-200"
                            >
                                Log out
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>

            <RegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} />
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </Navbar>
    );
}
