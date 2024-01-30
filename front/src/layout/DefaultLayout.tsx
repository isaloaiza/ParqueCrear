
import React from "react";
import { Header }  from "../components/header";


interface DefaultLayoutProps {
    children: React.ReactNode,
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>

        </>
    )

}