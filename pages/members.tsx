import { ReactElement, useEffect, useState } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../components";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/layouts/layout";

const Page: NextPageWithLayout = () => {
  const count = useQuery("getCounter");
  const incrementCounter = useMutation("incrementCounter");
  const { logout, user } = useAuth0();

  return <div>{user?.birthdate}</div>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
