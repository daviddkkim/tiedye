import React from "react";
import { NextPageWithLayout } from "./_app";
import { styled } from "../stitches.config";
import { useQuery } from "../convex/_generated/react";
import { useSpace } from "../utils/useSpace";
import { useRouter } from "next/router";
import { Document } from "../convex/_generated/dataModel";

const PageTitle = styled("h1", {
  fontSize: "$6",
  lineHeight: "$6",
  margin: 0,
});

const Box = styled("div", {
  display: "flex",
});

const Page: NextPageWithLayout = () => {
  const spaces = useQuery("getSpaces");
  const { setSpaceId } = useSpace();
  const router = useRouter();
  const handleClick = async (spaceId: string | null) => {
    setSpaceId && (await setSpaceId(spaceId));
    router.push("/");
  };
  return (
    <Box>
      <PageTitle> Choose a space</PageTitle>
      {spaces &&
        spaces.map((space) => {
          const spaceId = space ? space._id.toString() : null;

          return (
            <button
              onClick={() => {
                handleClick(space && space._id.toString());
              }}
              key={spaceId}
            >
              {space && space.name}
              {space && space.members?.length}
            </button>
          );
        })}
    </Box>
  );
};

export default Page;
