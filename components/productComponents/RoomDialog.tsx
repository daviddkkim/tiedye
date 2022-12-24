import React, { useState } from "react";
import { styled } from "../../stitches.config";
import { Button, Dialog, Label, TextInput } from "..";
import { BoxIcon } from "@radix-ui/react-icons";
import { useMutation } from "../../convex/_generated/react";
import { useSpace } from "../../utils/useSpace";

const Title = styled("h1", {
  fontSize: "$4",
  color: "$textPrimary",
  fontWeight: "400",
  margin: 0,
});

const Box = styled("div", {
  display: "flex",
});

const RoomDialog: React.FC = () => {
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const createRoom = useMutation("createRoom");
  const { spaceId } = useSpace();

  const handleCreateRoom = () => {
    if (!roomName) return;

    const room = {
      name: roomName,
      description: roomDescription,
      space: spaceId,
      object: {
        widgets: [],
      },
    };
    createRoom(room);
    setRoomName("");
  };
  return (
    <Dialog.Dialog
      title={<Title>Create Room</Title>}
      trigger={
        <Button>
          <BoxIcon /> Create Room
        </Button>
      }
    >
      <Box
        css={{
          gap: "$3",
          flexDirection: "column",
        }}
      >
        <Label htmlFor="roomName">
          Room name
          <TextInput
            value={roomName}
            placeholder="Thoughts"
            id={"roomName"}
            onChange={(e) => {
              setRoomName(e.currentTarget.value);
            }}
          />
        </Label>
        <Label htmlFor="roomDescription">
          Description
          <TextInput
            value={roomName}
            placeholder="Room to share my unfiltered thoughts"
            id={"roomDescription"}
            onChange={(e) => {
              setRoomDescription(e.currentTarget.value);
            }}
          />
        </Label>
      </Box>
      <Box
        css={{
          justifyContent: "flex-end",
          gap: "$2",
        }}
      >
        <Dialog.DialogCloseButton asChild>
          <Button variant={"tertiary"}>Cancel</Button>
        </Dialog.DialogCloseButton>
        <Dialog.DialogCloseButton asChild>
          <Button
            variant={"primary"}
            onClick={() => {
              handleCreateRoom();
            }}
          >
            Save
          </Button>
        </Dialog.DialogCloseButton>
      </Box>
    </Dialog.Dialog>
  );
};

export { RoomDialog };
