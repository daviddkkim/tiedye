import { styled } from "../../stitches.config";
import React, { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import { SideNav } from "../productComponents/SideNav";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "../../convex/_generated/react";
import { useRouter } from "next/router";
import { useSpace } from "../../utils/useSpace";

const StyledMain = styled("main", {
  display: "flex",
});

const PageSection = styled("section", {
  padding: "$6 $7",
  width: "100%",
});

export default function Layout({ children }: { children: ReactElement }) {
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const storeUser = useMutation("storeUser");
  const initializeSpace = useMutation("initializeSpace");
  const router = useRouter();
  const { space } = useSpace();

  if (!space) {
    router.push("/spaceSelect");
  }

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
    initializeSpace().catch(console.error);

    return () => setUserId(null);
  }, [storeUser, initializeSpace]);

  return (
    <>
      <Head>
        <title>Tie-dye</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledMain>
        <SideNav space={space} />
        <PageSection>{children}</PageSection>
      </StyledMain>
    </>
  );
}
