import React, { useState } from "react";
import { styled } from "../../stitches.config";
import { Button, Dialog, Label, TextInput, DialogCloseButton } from "..";
import { LightningBoltIcon } from "@radix-ui/react-icons";
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




const WidgetDialog: React.FC = () => {

    const [phase, setPhase] = useState('initial')
    const [roomName, setRoomName] = useState("");
    const [description, setDescription] = useState("");

    const updateRoom = useMutation("updateRoom");

    const getTitle = () => {
        if (phase === 'initial') return (<Title>Select a widget</Title>)

        if(phase === 'post') return (<Box css={{gap:'$2'}}> <Box css={{padding: '$1', border:'1px solid $fgAccentBorder', backgroundColor: '$fg'}}>Create a post</Box> </Box>)
    }
    return (
        <Dialog
            onOpenChange={()=>{
                setPhase('initial')
            }}
            title={getTitle()}
            trigger={
                <Button>
                    <LightningBoltIcon /> Add widget
                </Button>
            }
        >
            {phase === 'initial' &&
                <>
                    <Button onClick={() => { setPhase('post') }}>Post</Button>
                    <Button onClick={() => { }}>{'To-do list'}</Button>
                    <Button disabled>Chat</Button>
                </>
            }
            {phase === 'post' &&
                <>
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
                                onChange={(e) => {
                                    setRoomName(e.currentTarget.value);
                                }}
                            />
                        </Label>
                        <Label htmlFor="description">
                            Description
                            <TextInput
                                value={description}
                                placeholder="Room for us to work on holiday plans"
                                id={"description"}
                                onChange={(e) => {
                                    setDescription(e.currentTarget.value);
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
                        <DialogCloseButton asChild>
                            <Button variant={"tertiary"}>Cancel</Button>
                        </DialogCloseButton>
                        <DialogCloseButton asChild>
                            <Button
                                onClick={() => { }}
                            >
                                Save
                            </Button>
                        </DialogCloseButton>
                    </Box>
                </>}
        </Dialog>
    );
};

export { WidgetDialog };
