"use client"

import classes from "@/components/main-header/nav-link.module.css";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {PropsWithChildren} from "react";

export default function NavLink({href, children}: PropsWithChildren<{href: string}>) {
    const pathname = usePathname();
    return (
        <Link href={href} className={pathname.startsWith(href) ? `${classes.link} ${classes.active}` : classes.link}>
            {children}
        </Link>
    )
}
