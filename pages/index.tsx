import { ReactElement, useEffect, useState } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../components";
import type { NextPageWithLayout } from './_app'
import Layout from "../components/layouts/layout";
import { Id } from "../convex/_generated/dataModel";

const Page: NextPageWithLayout = () => {
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
  const count = useQuery("getCounter");
  const incrementCounter = useMutation("incrementCounter");
  const { logout, user } = useAuth0();

  return (
    <div >
      <Button
        onClick={() => {
          logout();
        }}
      >
        logout
      </Button>
      {user?.email}
      <div>{count && count.clicks}</div>
      <Button
        onClick={() =>
          incrementCounter({ ...count, clicks: count && count.clicks + 1 })
        }
      >
        {" "}
        +
      </Button>
    </div>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Page;
