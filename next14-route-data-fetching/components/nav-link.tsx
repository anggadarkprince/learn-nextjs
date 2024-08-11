"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";
import {PropsWithChildren} from "react";

export const NavLink = ({href, children}: PropsWithChildren<{href: string}>) => {
    const pathname = usePathname();
    return (
        <Link href={href} className={pathname.startsWith(href) ? 'active' : undefined}>
            {children}
        </Link>
    )
}
