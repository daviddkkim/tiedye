import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { Button, Label, TextInput } from "../../components";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Layout from "../../components/layouts/layout";
import { useMutation, useQuery } from "../../convex/_generated/react";
import { styled } from "../../stitches.config";
import type { NextPageWithLayout } from "../_app";
import { Cross2Icon } from "@radix-ui/react-icons";
import { nanoid } from 'nanoid'

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

const Page: NextPageWithLayout = () => {
  const { query, isReady } = useRouter();

  const { roomId } = query;

  //'123' helps us by pass the issue of url query being undefined at first render.
  const roomDetails = useQuery("getOneRoom", isReady ? roomId : "123");
  const updateRoom = useMutation("updateRoom");

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

  const object = {
    widgets: [
      {
        id: "1",
        type: "todo",
        title: "For Christmas",
        body: [
          {
            id: "123",
            content: "To do 1",
            completed: false,
          },
          {
            id: "1234",
            content: "To do 2",
            completed: true,
          },
        ],
      },
    ],
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

  const handleAddTodoItem = (content: string ,widget: Widget) => {

    const newItem = {
      id: nanoid(),
      content: content,
      completed: false,
    }
    const newWidget = {
      ...widget,
      body: [
        newItem,
        ...widget.body
      ]
    }

    const newWidgets = roomDetails.object.widgets.map((mappedWidget) => {
      if(mappedWidget.id === newWidget.id) {
        return newWidget
      }
      return mappedWidget;
    });

    const newRoom = {
      ...roomDetails,
      object: {
        widgets: newWidgets,
      },
    };
    
    updateRoom(newRoom)
  }

  return (
    <Box
      css={{
        flexDirection: "column",
        gap: "$4",
      }}
    >
      <Box
        css={{
          flexDirection: "column",
          gap: "$1",
        }}
      >
        <Box
          css={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PageTitle> {roomDetails && roomDetails.name}</PageTitle>
          <Box css={{ gap: "$2", alignItems: "center" }}>
            <SubText>
              {" "}
              {roomDetails && getUpdatedTime(roomDetails.lastUpdatedAt)}{" "}
            </SubText>
            <Button>
              <DotsHorizontalIcon />
            </Button>
          </Box>
        </Box>
        <Text>{roomDetails && roomDetails.description}</Text>
      </Box>
      <Box>
        <Button> Add widget </Button>
      </Box>

      {roomDetails &&
        roomDetails.object.widgets.map((widget) => {
          return (
            <Box
              css={{
                flexDirection: "column",
                gap: "$3",
                border: "1px solid $separator",
                padding: "$2 $4 $4 $4",
                borderRadius: "$1",
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
                      handleAddTodoItem(e.currentTarget.value, widget)
                      e.currentTarget.value = ''
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
        })}
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
