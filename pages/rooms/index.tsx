import React, { ReactElement } from "react";
import { useQuery } from "../../convex/_generated/react";
import {
  RoomDialog,
  TH,
  TRlink,
  THeadRow,
  TBody,
  TD,
  Table,
} from "../../components";
import type { NextPageWithLayout } from "../_app";
import Layout from "../../components/layouts/layout";
import { styled } from "../../stitches.config";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useSpace } from "../../utils/useSpace";

const PageTitle = styled("h1", {
  fontSize: "$6",
  lineHeight: "$6",
  margin: 0,
});

const Box = styled("div", {
  display: "flex",
  
});

const Page: NextPageWithLayout = () => {
  const { spaceId } = useSpace();
  const rooms = useQuery("getRooms", spaceId);
  return (
    <Box
      css={{
        gap: "$4",
        flexDirection: "column",
        padding: "$6 $7",
      }}
    >
      <Box
        css={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PageTitle> Rooms</PageTitle>
        <RoomDialog />
      </Box>
      {rooms && rooms.length > 0 ? (
        <Table>
          <THeadRow>
            <TH>Room name</TH>
            <TH>Description</TH>
            <TH>Creator</TH>
            <TH>Created</TH>
            <TH> </TH>
          </THeadRow>
          {rooms.map((room) => {
            return (
              <TRlink
                href={"/rooms/" + room._id.toString()}
                style={{ width: "100%", display: "table-row" }}
                key={room._id.toString()}
              >
                <TD>{room.name}</TD>
                <TD>{room.description}</TD>
                <TD>{room.creator}</TD>
                <TD>{new Date(room._creationTime).toDateString()}</TD>
                <TD
                  css={{
                    width: "40px",
                  }}
                >
                  {" "}
                  <ArrowRightIcon />{" "}
                </TD>
              </TRlink>
            );
          })}
        </Table>
      ) : (
        <Box
          css={{
            minHeight: "200px",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "$textSecondary",
            fontSize: "$5",
            gap: "$2",
            border: "1px solid $separator",
            backgroundColor: "$bgSecondary",
            borderRadius: "$1",
          }}
        >
          {"You don't have any room"}
          <RoomDialog />
        </Box>
      )}
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
