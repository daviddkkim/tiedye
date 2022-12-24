import React, { ReactElement } from "react";
import { useQuery } from "../../convex/_generated/react";
import {
  RoomDialog,
  TH,
  TRlink,
  THeadRow,
  TD,
  Table,
  Button,
  Link,
} from "../../components";
import type { NextPageWithLayout } from "../_app";
import Layout from "../../components/layouts/layout";
import { styled } from "../../stitches.config";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useSpace } from "../../utils/useSpace";
import { getUpdatedTime } from "../../utils/time";

const PageTitle = styled("h1", {
  fontSize: "$6",
  lineHeight: "$6",
  margin: 0,
});

const Box = styled("div", {
  display: "flex",
});

const CardTitle = styled("h2", {
  fontSize: "$3",
  lineHeight: "$3",
  margin: 0,
});

const CardMetaData = styled("span", {
  color: "$textSecondary",
  fontSize: "$2",
  lineHeight: "$2",
});

const Page: NextPageWithLayout = () => {
  const { spaceId } = useSpace();
  const rooms = useQuery("getRooms", spaceId);
  return (
    <Box
      css={{
        gap: "$4",
        flexDirection: "column",
        padding: "$6",
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
      </Box>
      <RoomDialog />

      {rooms && rooms.length > 0 ? (
        /*   <Table>
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
          </Table> */
        <Box
          css={{
            flexWrap: "wrap",
            gap: "$3",
          }}
        >
          {rooms.map((room) => {
            return (
              <Link
                css={{
                  height: "auto",
                  alignItems: "flex-start",
                  padding: "$3",
                  flexDirection: "column",
                  gap: "$3",
                  borderRadius: "$1",
                }}
                href={"/rooms/" + room._id.toString()}
                key={room._id.id}
              >
                <Box
                  css={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <CardTitle>{room.name}</CardTitle>
                  <ArrowRightIcon />
                </Box>
                <span>{room.description}</span>
                <Box
                  css={{
                    flexDirection: "column",
                    gap: "$1",
                    alignItems: "flex-start",
                  }}
                >
                  <CardMetaData>created by {room.creator}</CardMetaData>
                  <CardMetaData>
                    updated {getUpdatedTime(room.lastUpdatedAt)}
                  </CardMetaData>
                </Box>
              </Link>
            );
          })}
        </Box>
      ) : null}
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
