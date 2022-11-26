import React, { useState } from "react";
import { styled } from "../../stitches.config";
import { Button, Dialog, Label, TextInput, DialogCloseButton } from "..";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useMutation } from "../../convex/_generated/react";

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

    const [roomName, setRoomName] = useState('');
    const [description, setDescription] = useState('');

    const createRoom = useMutation('createRoom');

    const handleCreateRoom = () => {
        if (!roomName) return;

        const room = {
            name: roomName,
            description: description,
            object: '{}'
        }
        createRoom(room);
        setRoomName('');
        setDescription('');
    }
    return (
        <Dialog
            title={<Title>Create Room</Title>}
            trigger={
                <Button>
                    <Pencil2Icon /> Create Room
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
                        placeholder="David & Emily Todo"
                        id={"roomName"}
                        onChange={(e) => { setRoomName(e.currentTarget.value) }}
                    />
                </Label>
                <Label htmlFor="description">
                    Description
                    <TextInput
                        value={description}
                        placeholder="Room for us to work on holiday plans"
                        id={"description"}
                        onChange={(e) => { setDescription(e.currentTarget.value) }}
                    />
                </Label>
            </Box>
            <Box
                css={{
                    justifyContent: "flex-end",
                    gap: "$2",
                }}
            >
                <DialogCloseButton asChild>
                    <Button variant={"tertiary"}>Cancel</Button>
                </DialogCloseButton>
                <DialogCloseButton asChild>
                    <Button onClick={() => { handleCreateRoom() }}>Save</Button>
                </DialogCloseButton>
            </Box>
        </Dialog>
    );
};

export { RoomDialog };
