import { ReactElement } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../components";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/layouts/layout";

const Page: NextPageWithLayout = () => {
  const { logout, user } = useAuth0();

  return (
    <div>
      <Button
        onClick={() => {
          logout();
        }}
      >
        logout
      </Button>
      {user?.email}
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
