import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { Button, Label } from "../../components";
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import Layout from "../../components/layouts/layout";
import { useQuery } from "../../convex/_generated/react";
import { styled } from "../../stitches.config";
import type { NextPageWithLayout } from "../_app";
import { nanoid } from 'nanoid'

const PageTitle = styled("h1", {
  fontSize: "$6",
  lineHeight: "$6",
  margin: 0,
});

const SubText = styled('span', {
  fontSize: '$2',
  color: '$textSecondary'
})

const Text = styled('span', {
  fontSize: '$3',
  color: '$textSecondary'
})

const Box = styled("div", {
  display: "flex",
});

const Page: NextPageWithLayout = () => {
  const { query, isReady } = useRouter();

  const { roomId } = query;

  //'123' helps us by pass the issue of url query being undefined at first render.
  const roomDetails = useQuery('getOneRoom', isReady ? roomId : '123');

  if (!roomDetails) return <div> loading... </div>;

  const getUpdatedTime = (lastUpdatedAt: number) => {

    const now = Date.now();
    const delta = Math.floor(now / 1000) - Math.floor(lastUpdatedAt / 1000);
    if (delta > 2 * 24 * 3600) {
      return "a few days ago";
    }
    if (delta > 24 * 3600) {
      return "yesterday";
    }

    if (delta > 3600) {
      return "a few hours ago";
    }
    if (delta > 1800) {
      return "Half an hour ago";
    }
    if (delta > 60) {
      return Math.floor(delta / 60) + " minutes ago";
    }
  }

  return (
    <Box css={{
      flexDirection: 'column',
      gap: '$4'
    }}>
      <Box css={{
        flexDirection: 'column',
        gap: '$1'
      }}>
        <Box
          css={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PageTitle> {roomDetails && roomDetails.name}</PageTitle>
          <Box css={{ gap: '$2', alignItems: 'center' }}>
            <SubText> {roomDetails && getUpdatedTime(roomDetails.lastUpdatedAt)} </SubText>
            <Button><DotsHorizontalIcon /></Button>
          </Box>
        </Box>
        <Text>{roomDetails && roomDetails.description}</Text>
      </Box>
      <Box>
        <Button> Add widget </Button>
      </Box>
      <Box css={{
        flexDirection:'column',
        gap: '$2',
      }}>
        {roomDetails && roomDetails.object.widgets.map((widget) => {
          return (
            widget.body.map((item) => {
              return (
                <Label css={{ gap: '$2', flexDirection:'row' }}> <input type={'checkbox'} checked={item.completed} /> {item.content} </Label>)
            })
          )
        })}
      </Box>
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};


export default Page;
