import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useMemo } from "react";
import {
  Button,
  Dialog,
  PostNode,
  TextInput,
  TodoNode,
  WidgetDialog,
} from "../../components";
import Layout from "../../components/layouts/layout";
import { useMutation, useQuery } from "../../convex/_generated/react";
import { styled } from "../../stitches.config";
import type { NextPageWithLayout } from "../_app";
import { nanoid } from "nanoid";
import ReactFlow, {
  Background,
  Controls,
  Node,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  ChatBubbleIcon,
  Cross2Icon,
  DotsVerticalIcon,
  HeartIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

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

const PageTitle = styled("h1", {
  fontSize: "$6",
  lineHeight: "$6",
  margin: 0,
});

const SubText = styled("span", {
  fontSize: "$2",
  color: "$textSecondary",
});

const Text = styled("span", {
  fontSize: "$3",
  color: "$textSecondary",
});

const Box = styled("div", {
  display: "flex",
});

const DialogTitle = styled("h1", {
  fontSize: "$4",
  color: "$textSecondary",
  fontWeight: "400",
  margin: 0,
});

const Page: NextPageWithLayout = () => {
  const { query, isReady } = useRouter();

  const { roomId } = query;

  //'123' helps us by pass the issue of url query being undefined at first render.
  const roomDetails = useQuery("getOneRoom", isReady ? roomId : "123");
  const updateRoom = useMutation("updateRoom");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  useEffect(() => {
    const initialNodes: Node[] = roomDetails
      ? roomDetails.object.widgets.map((widget, i) => {
          if (widget.type === "post") {
            return {
              id: widget.id,
              type: "postNode",
              position: { x: i * 100 + 100, y: i * 100 + 100 },
              data: { ...widget, roomDetails: roomDetails },
              draggable: true,
            };
          } else {
            return {
              id: widget.id,
              type: "todoNode",
              position: { x: i * 100 + 100, y: i * 100 + 100 },
              data: { ...widget, roomDetails: roomDetails },
              draggable: true,
            };
          }
        })
      : [
          {
            id: "1",
            type: "postNode",
            position: { x: 0, y: 0 },
            draggable: true,
            data: {
              roomDetails: null,
              id: "1",
              type: "post",
              title: "hello",
              body: [
                {
                  id: "1",
                  content: "empty",
                  completed: false,
                },
              ],
            },
          },
        ];
    setNodes(initialNodes);
  }, [roomDetails, setNodes]);

  const nodeTypes = useMemo(
    () => ({ postNode: PostNode, todoNode: TodoNode }),
    []
  );

  if (!roomDetails) return <div> loading... </div>;

  const getUpdatedTime = (lastUpdatedAt: number) => {
    const now = Date.now();
    const delta = Math.floor(now / 1000) - Math.floor(lastUpdatedAt / 1000);
    if (delta > 2 * 24 * 3600) {
      return "a few days ago";
    }
    if (delta > 24 * 3600) {
      return "yesterday";
    }

    if (delta > 3600) {
      return "a few hours ago";
    }
    if (delta > 1800) {
      return "Half an hour ago";
    }
    if (delta > 60) {
      return Math.floor(delta / 60) + " minutes ago";
    }
  };

  const handleTodoToggle = (id: string, widget: Widget) => {
    const newBody = widget.body.map((item) => {
      if (item.id !== id) return item;

      return { ...item, completed: !item.completed };
    });
    const newWidget = {
      ...widget,
      body: newBody,
    };

    const newWidgets = roomDetails.object.widgets.map((mappedWidget) => {
      if (mappedWidget.id !== widget.id) return mappedWidget;

      return newWidget;
    });

    const newRoom = {
      ...roomDetails,
      object: {
        widgets: newWidgets,
      },
    };
    updateRoom(newRoom);
  };

  const handleDeleteWidget = (widget: Widget) => {
    const newWidgets = roomDetails.object.widgets.filter((mappedWidget) => {
      return mappedWidget.id !== widget.id;
    });
    const newRoom = {
      ...roomDetails,
      object: {
        widgets: newWidgets,
      },
    };
    updateRoom(newRoom);
  };

  const handleAddTodoItem = (content: string, widget: Widget) => {
    const newItem = {
      id: nanoid(),
      content: content,
      completed: false,
    };
    const newWidget = {
      ...widget,
      body: [newItem, ...widget.body],
    };

    const newWidgets = roomDetails.object.widgets.map((mappedWidget) => {
      if (mappedWidget.id === newWidget.id) {
        return newWidget;
      }
      return mappedWidget;
    });

    const newRoom = {
      ...roomDetails,
      object: {
        widgets: newWidgets,
      },
    };

    updateRoom(newRoom);
  };

  const handleAddPostWidget = (content: string) => {
    const newWidget = {
      id: nanoid(),
      type: "post",
      title: "",
      body: [
        {
          id: nanoid(),
          content: content,
          completed: false,
        },
      ],
    };
    const newRoom = {
      ...roomDetails,
      object: {
        widgets: [newWidget, ...roomDetails.object.widgets],
      },
    };
    updateRoom(newRoom);
  };

  const handleAddTodoWidget = () => {
    const newWidget = {
      id: nanoid(),
      type: "todo",
      title: "New Todo",
      body: [],
    };
    const newRoom = {
      ...roomDetails,
      object: {
        widgets: [newWidget, ...roomDetails.object.widgets],
      },
    };
    updateRoom(newRoom);
  };

  return (
    <Box
      css={{
        flexDirection: "column",
        gap: "$4",
        padding: "$6",
      }}
    >
      <Box
        css={{
          flexDirection: "column",
          gap: "$1",
        }}
      >
        <Box css={{ gap: "$2", alignItems: "center" }}>
          <PageTitle> {roomDetails && roomDetails.name}</PageTitle>
          <Text>{roomDetails && roomDetails.description}</Text>
        </Box>
        <Box css={{ gap: "$2", alignItems: "center" }}>
          <SubText>
            {" "}
            {roomDetails && getUpdatedTime(roomDetails.lastUpdatedAt)}{" "}
          </SubText>
          <WidgetDialog
            onTodoWidgetAdd={handleAddTodoWidget}
            onPostWidgetAdd={handleAddPostWidget}
          />
        </Box>
      </Box>

      {roomDetails &&
        roomDetails.object.widgets.map((widget) => {
          if (widget.type === "post") {
            return (
              <Box
                css={{
                  flexDirection: "column",
                  gap: "$3",
                  backgroundColor: "$bgSecondary",
                  border: "1px solid $separator",
                  padding: "$3",
                  borderRadius: "$1",
                  fontSize: "$3",
                  lineHeight: "135%",
                  width: "fit-content",
                  boxShadow: "0px 1px 2px 2px $colors$shadow",
                  position: "relative",
                  maxWidth: "300px",
                }}
                key={widget.id}
              >
                <Box>{widget.body[0].content}</Box>
                <Box
                  css={{
                    justifyContent: "space-between",
                    color: "$textSecondary",
                    alignItems: "center",
                  }}
                >
                  <Box
                    css={{
                      gap: "$2",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Button
                      variant={"tertiary"}
                      css={{
                        color: "$textSecondary",
                      }}
                    >
                      <ChatBubbleIcon />
                    </Button>
                    <Button
                      variant={"tertiary"}
                      css={{
                        color: "$textSecondary",
                      }}
                    >
                      <HeartIcon />
                    </Button>
                    <Dialog.Dialog
                      title={
                        <DialogTitle>
                          Are you sure you want to delete this?{" "}
                        </DialogTitle>
                      }
                      fitContent
                      trigger={
                        <Button
                          variant={"tertiary"}
                          css={{
                            color: "$textSecondary",
                          }}
                        >
                          <TrashIcon />
                        </Button>
                      }
                    >
                      Once you delete this, it is not recoverable. <br />
                      Would you still like to delete this item?
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
                            onClick={() => {
                              handleDeleteWidget(widget);
                            }}
                          >
                            {" "}
                            Confirm
                          </Button>
                        </Dialog.DialogCloseButton>
                      </Box>
                    </Dialog.Dialog>
                  </Box>
                  {new Date(roomDetails.lastUpdatedAt).toLocaleDateString()}
                </Box>
              </Box>
            );
          }
          if (widget.type === "todo") {
            return (
              <Box
                css={{
                  flexDirection: "column",
                  gap: "$3",
                  backgroundColor: "$bgSecondary",
                  padding: "$2 $4 $4 $4",
                  borderRadius: "$1",
                  boxShadow: "0px 1px 2px 2px $colors$shadow",
                }}
                key={widget.id}
              >
                <Box
                  css={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{widget.title}</Text>
                  <Button
                    variant={"tertiary"}
                    css={{ color: "$textSecondary" }}
                    onClick={() => {
                      handleDeleteWidget(widget);
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
                        handleAddTodoItem(e.currentTarget.value, widget);
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
                  {widget.body.map((item) => {
                    return (
                      <Box
                        css={{ gap: "$2", flexDirection: "row" }}
                        key={item.id}
                      >
                        <input
                          type={"checkbox"}
                          checked={item.completed}
                          onChange={() => handleTodoToggle(item.id, widget)}
                        />
                        <span>{item.content}</span>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            );
          }
        })}
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
