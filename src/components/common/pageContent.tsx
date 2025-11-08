"use client";

import {usePathname} from "next/navigation";
import {siteConfig} from "@/src/config/site.config";
import NotFoundPage from "@/src/app/not-found";
import parse from "html-react-parser"

export default function PageContent() {
    const pathname = usePathname()
    const pageContent = siteConfig.pagesContent[pathname as keyof typeof siteConfig.pagesContent]

    if (!pageContent) {
        return <NotFoundPage />
    }


    return (
            <div> { parse(pageContent.content) } </div>
    )
}