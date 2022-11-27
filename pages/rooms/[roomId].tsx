import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { Button } from "../../components";
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import Layout from "../../components/layouts/layout";
import { useQuery } from "../../convex/_generated/react";
import { styled } from "../../stitches.config";
import type { NextPageWithLayout } from "../_app";

const PageTitle = styled("h1", {
  fontSize: "$6",
  lineHeight: "$6",
  margin: 0,
});

const Box = styled("div", {
  display: "flex",
});

const Page: NextPageWithLayout = () => {
  const { query, isReady } = useRouter();

  const { roomId } = query;
  if (!roomId) {
    return <div>
      loading...
    </div>
  }

  if (!isReady) {
    return <div>
      loading...
    </div>
  }
  const roomDetails = useQuery('getOneRoom', roomId);
  console.log(roomDetails)
  return (
    <div>
      <Box
        css={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PageTitle> Rooms</PageTitle>
        <Box css={{ gap: '$2' }}>
          <span> {roomDetails && roomDetails.latUpdatedAt} </span>
          <Button><DotsHorizontalIcon /></Button>
        </Box>
      </Box>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};


export default Page;
