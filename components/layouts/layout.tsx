import { styled } from "../../stitches.config";
import React, { ReactElement } from "react";
import Head from "next/head";
import { SideNav } from "../SideNav";

const StyledMain = styled('main', {
    display: 'flex',
})

const PageSection = styled('section', {
    padding: '$4'
})

export default function Layout({ children }: { children: ReactElement }) {

    return (
        <>
            <Head>
                <title>Tie-dye</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StyledMain>
                <SideNav />
                <PageSection>
                    {children}
                </PageSection>
            </StyledMain>
        </>
    )
}