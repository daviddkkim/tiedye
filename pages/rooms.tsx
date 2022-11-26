import { ReactElement, useEffect, useState } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, RoomDialog } from "../components";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/layouts/layout";
import { styled } from "../stitches.config";

const PageTitle = styled('h1', {
    fontSize: '$6',
    lineHeight: '$6',
    margin: 0
})

const Box = styled('div', {
    display: 'flex'
})

const Page: NextPageWithLayout = () => {
    const rooms = useQuery("getRooms");
    const createRoom = useMutation("createRoom");
    console.log("", rooms);
    const { logout, user } = useAuth0();
    return (
        <div>
            <Box css={{
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <PageTitle> Rooms</PageTitle>
                <RoomDialog />
            </Box>
            <div>
                {rooms &&
                    rooms.map((room) => {
                        return (
                            <div key={room._id.id}>
                                <span>{room.name}</span>
                                <span>{room.owner.id}</span>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Page;
