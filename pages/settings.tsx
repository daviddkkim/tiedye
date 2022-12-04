import React, { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/layouts/layout";
import { styled } from "../stitches.config";

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
      <PageTitle> Settings</PageTitle>
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
