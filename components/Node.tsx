import { Cross2Icon } from '@radix-ui/react-icons';
import React from 'react';
import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useMutation } from '../convex/_generated/react';
import { styled } from '../stitches.config';
import { Button } from './Button';
import { TextInput } from './TextInput';


export interface Objects {
    widgets: Widget[];
}

export interface Widget {
    id: string;
    type: string;
    title: string;
    body: Body[];
}

export interface Body {
    id: string;
    content: string;
    completed: boolean;
}
const NodeContainer = styled('div', {
    padding: '$2',
    backgroundColor: '$fg',
    border: '1px solid $separator',
})

const Box = styled("div", {
    display: "flex",
});

const Text = styled("span", {
    fontSize: "$3",
    color: "$textSecondary",
});

const PostNode = ({ data }) => {

    if (data.type !== "post") {
        return null;
    }
    

    return (
        <NodeContainer>
            <div>
                {data.title}
                {data.body.map((body) => {
                    return <div key={body.id}> {body.content} </div>
                })}
            </div>
        </NodeContainer>
    );
}

const TodoNode = ({ data }: { data: Widget }) => {

    const updateRoom = useMutation("updateRoom");

    if (data.type !== "todo") {
        return null;
    }


    return (
        <NodeContainer key={data.id}>
            <Box css={{
                    flexDirection:'column',
            }}>
                <Box
                    css={{
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text>{data.title}</Text>
                    <Button
                        variant={"tertiary"}
                        css={{ color: "$textSecondary" }}
                        onClick={() => {
                        }}
                    >
                        <Cross2Icon />
                    </Button>
                </Box>
                <TextInput
                    placeholder="Type to create a to-do item"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            if (e.currentTarget.value.length > 0) {
                                e.currentTarget.value = "";
                            }
                        }
                    }}
                />
                <Box
                    css={{
                        flexDirection: "column",
                        gap: "$1",
                    }}
                >
                    {data.body.map((item) => {
                        return (
                            <Box
                                css={{ gap: "$2", flexDirection: "row" }}
                                key={item.id}
                            >
                                <input
                                    type={"checkbox"}
                                    checked={item.completed}
                                />
                                <span>{item.content}</span>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </NodeContainer>
    );
}


export { PostNode, TodoNode }