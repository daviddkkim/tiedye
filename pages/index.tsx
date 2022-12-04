import { ReactElement } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../components";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/layouts/layout";
import React from "react";

const Page: NextPageWithLayout = () => {
  const { logout, user } = useAuth0();
  const handleLogout = () => {
    localStorage.removeItem("space");
    logout();
  };
  return (
    <div>
      <Button
        onClick={() => {
          handleLogout();
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
