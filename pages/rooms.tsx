import { ReactElement, useEffect, useState } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, RoomDialog, TH, TR, THead, TBody, TD, Table } from "../components";
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
});

const Page: NextPageWithLayout = () => {
    const rooms = useQuery("getRooms");
    console.log("", rooms);
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
                <RoomDialog />
            </Box>
            <Table>
                <THead>
                    <TR>
                        <TH>Room name</TH>
                        <TH>Description</TH>
                        <TH>Owner</TH>
                        <TH>Created</TH>
                        <TH> -</TH>
                    </TR>
                </THead>
                <TBody>
                    {rooms &&
                        rooms.map((room) => {
                            return (
                                <TR key={room._id.id}>
                                    <TD>{room.name}</TD>
                                    <TD>{room.owner.id}</TD>
                                </TR>
                            );
                        })}
                </TBody>
            </Table>
        </div>
    );
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Page;
