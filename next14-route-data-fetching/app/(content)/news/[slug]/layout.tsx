import {PropsWithChildren} from "react";

export default function NewsDetailLayout({children, modal}: PropsWithChildren<{modal: React.ReactNode}>) {
    return (
        <>
            {modal}
            {children}
        </>
    )
}
