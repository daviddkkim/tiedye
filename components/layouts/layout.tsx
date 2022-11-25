import { styled } from "../../stitches.config";
import React, { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import { SideNav } from "../SideNav";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "../../convex/_generated/react";

const StyledMain = styled('main', {
    display: 'flex',
})

const PageSection = styled('section', {
    padding: '$4'
})

export default function Layout({ children }: { children: ReactElement }) {
    const [userId, setUserId] = useState<Id<"users"> | null>(null);
    const storeUser = useMutation("storeUser");
    // Call the `storeUser` mutation function to store
    // the current user in the `users` table and return the `Id` value.
    useEffect(() => {
        // Store the user in the database.
        // Recall that `storeUser` gets the user information via the `auth`
        // object on the server. You don't need to pass anything manually here.
        async function createUser() {
            const id = await storeUser();
            setUserId(id);
        }
        createUser().catch(console.error);
        return () => setUserId(null);
    }, [storeUser]);
    
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
