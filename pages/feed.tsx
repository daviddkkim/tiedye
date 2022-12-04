import { ReactElement } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../components";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/layouts/layout";
import { styled } from "../stitches.config";
import React from "react";

const PageTitle = styled("h1", {
  fontSize: "$6",
  lineHeight: "$6",
  margin: 0,
});

const Box = styled("div", {
  display: "flex",
    padding: "$6 $7",

});

const Page: NextPageWithLayout = () => {
  return (
    <Box>
      <PageTitle>Feed</PageTitle>
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
