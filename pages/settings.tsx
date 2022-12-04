import React, { ReactElement, useState } from "react";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/layouts/layout";
import { ClipboardCopyIcon, CheckIcon } from '@radix-ui/react-icons'
import { styled } from "../stitches.config";
import { useQuery } from "../convex/_generated/react";
import { Button, Label } from "../components";
import { useSpace } from "../utils/useSpace";

const PageTitle = styled("h1", {
  fontSize: "$6",
  lineHeight: "$6",
  margin: 0,
});

const Box = styled("div", {
  display: "flex",
});

const Text = styled('span', {
  fontSize: '$2'
})

const Page: NextPageWithLayout = () => {

  const user = useQuery("getUser");
  const [userCopied, setUserCopied] = useState(false);
  const [spaceCopied, setSpaceCopied] = useState(false);

  const { spaceId } = useSpace();
  const userId = user ? user?._id.toString() : 'Failed to grab the user ID'
  const tokenspaceId = spaceId? spaceId : 'Failed to grab the space ID';

  return (
    <Box css={{
      gap: '$4',
      flexDirection: 'column',
      padding: "$6 $7",
    }}>
      <PageTitle> Settings</PageTitle>
      <Box css={{
        flexDirection: 'column',
        gap: '$1'
      }}>
        <Label>
          <Box css={{
            flexDirection: 'column',
            gap: '$1'

          }}>
            User ID
            <Text>
              The identifier that is used to be invited
            </Text>
          </Box>
          <Button variant={"secondary"} onClick={() => {
            navigator.clipboard.writeText(userId);
            setUserCopied(true)
          }}>
            {userId}
            <ClipboardCopyIcon />
            {userCopied &&
              <CheckIcon style={{
                color: 'green'
              }} />}
          </Button>
        </Label>
      </Box>
      <Box css={{
        flexDirection: 'column',
        gap: '$1'
      }}>
        <Label>
          <Box css={{
            flexDirection: 'column',
            gap: '$1'
          }}>
            Space ID
            <Text>
              The identifier that is used to join spaces
            </Text>
          </Box>
          <Button variant={"secondary"} onClick={() => {
            navigator.clipboard.writeText(tokenspaceId);
            setSpaceCopied(true)
          }}>
            {spaceId}
            <ClipboardCopyIcon />
            {spaceCopied &&
              <CheckIcon style={{
                color: 'green'
              }} />}
          </Button>
        </Label>
      </Box>
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
