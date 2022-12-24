import React, { useState } from "react";
import { NextPageWithLayout } from "./_app";
import { styled } from "../stitches.config";
import { useMutation, useQuery } from "../convex/_generated/react";
import { useSpace } from "../utils/useSpace";
import { useRouter } from "next/router";
import { Button, Label, TextInput } from "../components";

const PageTitle = styled("h1", {
  fontSize: "$6",
  lineHeight: "$6",
  margin: 0,
});

const Box = styled("div", {
  display: "flex",
});

const CardTitle = styled("h2", {
  margin: 0,
  fontSize: "$4",
  lineHeight: "$4",
  color: '$textSecondary'
})

const Page: NextPageWithLayout = () => {
  const spaces = useQuery("getSpaces");
  const { setSpaceId } = useSpace();
  const router = useRouter();
  const initializeSpace = useMutation("initializeSpace");
  const joinSpace = useMutation("joinSpace");
  const [joinSpaceId, setJoinSpaceId] = useState("");
  const handleClick = async (spaceId: string | null) => {
    setSpaceId && (await setSpaceId(spaceId));
    router.push("/");
  };

  return (
    <Box
      css={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        margin: "$4",
      }}
    >
      {spaces ?
        spaces.map((space) => {
          const spaceId = space ? space._id.toString() : null;
          return (
            <Box css={{
              flexDirection: 'column',
              gap: '$6',
              key={spaceId}
            }}>
              <PageTitle>
                Enter a space
              </PageTitle>
              <Button
                onClick={() => {
                  handleClick(space && space._id.toString());
                }}
                css={{
                  height: 'auto',
                  width: 'auto',
                  flexDirection:'column',
                  alignItems:'flex-start',
                  padding: '$3',
                  gap: '$4',
                  fontSize: '$4'
                }}
              >
                <CardTitle>
                  {space && space.name}
                </CardTitle>
                {space && "Member count: " + space.members.length}
              </Button>
            </Box>
          );
        }) :
        <Box
          css={{
            height: "300px",
            maxWidth: "400px",
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "column",
            border: "1px solid $separator",
            padding: "$5",
            borderRadius: "$1",
          }}
        >
          <PageTitle> Find your space</PageTitle>
          <Label>
            Space ID
            <TextInput
              value={joinSpaceId}
              onChange={(e) => {
                setJoinSpaceId(e.currentTarget.value);
              }}
            />
          </Label>
          <Box
            css={{
              flexDirection: "column",
              width: "100%",
              gap: "$4",
              textAlign: "center",
            }}
          >
            <Button
              onClick={() => {
                joinSpace(joinSpaceId)
                  .then(() => {
                    setJoinSpaceId("");
                  })
                  .catch((error: Error) => {
                    alert(error.toString());
                  });
              }}
              variant="primary"
              stretch
              css={{
                justifyContent: "center",
              }}
            >
              {" "}
              Join existing space
            </Button>
            or
            <Button
              onClick={() => {
                initializeSpace()
                  .then((response) => {
                    if (response) handleClick(response.id);
                    return;
                  })
                  .catch(() => {
                    alert("failed to initialize space");
                  });
              }}
              stretch
              css={{
                justifyContent: "center",
              }}
            >
              {" "}
              Start my own space
            </Button>
          </Box>
        </Box>
      }

    </Box>
  );
};

export default Page;
