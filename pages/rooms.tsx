import { ReactElement, useEffect, useState } from "react";
import { useMutation, useQuery } from "../convex/_generated/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../components";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/layouts/layout";

const Page: NextPageWithLayout = () => {
  const rooms = useQuery("getRooms");
  const createRoom = useMutation("createRoom");
  console.log("", rooms);
  const { logout, user } = useAuth0();
  return (
    <div>
      {user?.name}
      <Button
        onClick={() => {
          createRoom();
        }}
      >
        Create Room
      </Button>
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
