import { ReactElement } from "react";
import { useQuery } from "../../convex/_generated/react";
import { RoomDialog, TH, TRlink, THeadRow, TBody, TD, Table } from "../../components";
import type { NextPageWithLayout } from "../_app";
import Layout from "../../components/layouts/layout";
import { styled } from "../../stitches.config";
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Link from "next/link";

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
        <Box css={{
            gap: '$4',
            flexDirection:'column'
        }}>
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
            {rooms &&
                <Table>
                    <THeadRow>
                        <TH>Room name</TH>
                        <TH>Description</TH>
                        <TH>Owner</TH>
                        <TH>Created</TH>
                        <TH> </TH>
                    </THeadRow>
                    {rooms &&
                        rooms.map((room) => {
                            return (
                                <TRlink href={'/rooms/'+room._id} style={{width: '100%', display:'table-row'}}>
                                        <TD>{room.name}</TD>
                                        <TD>{room.description}</TD>
                                        <TD>{room.owner.id}</TD>
                                        <TD>{new Date(room._creationTime).toDateString()}</TD>
                                        <TD css={{
                                            width: '40px'
                                        }}> <ArrowRightIcon /> </TD>
                                </TRlink>
                            );
                        })}
                </Table>
            }
        </Box>
    );
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Page;
