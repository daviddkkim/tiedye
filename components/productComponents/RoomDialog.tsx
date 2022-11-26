import React from "react";
import { styled } from "../../stitches.config";
import { Button, Dialog, Label, TextInput } from "..";
import { Pencil2Icon } from '@radix-ui/react-icons';

const Title = styled('h1', {
    fontSize: '$4',
    color: '$textPrimary',
    fontWeight: '400',
    margin: 0
})

const Box = styled('div', {
    display: 'flex',
})

const RoomDialog: React.FC = () => {

    return (
        <Dialog
            title={<Title>Create Room</Title>}
            trigger={
                <Button>
                    <Pencil2Icon /> Create Room
                </Button>}
        >
            <Box css={{
                gap: '$3',
                flexDirection: 'column'

            }}>
                <Label htmlFor="roomName">
                    Room name
                    <TextInput placeholder="David & Emily Todo" id={'roomName'}></TextInput>
                </Label>
                <Label htmlFor="description">
                    Description
                    <TextInput placeholder="Room for us to work on holiday plans" id={'description'}></TextInput>
                </Label>
            </Box>
            <Box css={{
                justifyContent: 'flex-end',
                gap: '$2'
            }}>
                <Button variant={'tertiary'}>Cancel</Button>
                <Button>Save</Button>
            </Box>
        </Dialog>
    )

}

export { RoomDialog };