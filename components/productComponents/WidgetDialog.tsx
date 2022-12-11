import React, { useState } from "react";
import { styled } from "../../stitches.config";
import { Button, Dialog, Label, TextArea } from "..";
import {
  PlusIcon,
  ListBulletIcon,
  ChatBubbleIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";

const Title = styled("h1", {
  fontSize: "$4",
  color: "$textSecondary",
  fontWeight: "400",
  margin: 0,
});

const Box = styled("div", {
  display: "flex",
});

interface WidgetDialogProps {
  onTodoWidgetAdd: () => void;
  onPostWidgetAdd: (content: string) => void;
}

const WidgetDialog: React.FC<WidgetDialogProps> = ({
  onPostWidgetAdd,
  onTodoWidgetAdd,
}) => {
  const [phase, setPhase] = useState("initial");
  const [post, setPost] = useState("");

  const getTitle = () => {
    if (phase === "initial")
      return (
        <Box css={{ gap: "$3", flexDirection: "column" }}>
          <Box
            css={{
              padding: "$1",
              border: "1px solid $fgAccentBorder",
              backgroundColor: "$fgAccent",
              fontSize: "$2",
              borderRadius: "$1",
              width: "fit-content",
            }}
          >
            Widget
          </Box>{" "}
          <Title>Select a widget</Title>
        </Box>
      );

    if (phase === "post")
      return (
        <Box css={{ gap: "$3", flexDirection: "column" }}>
          <Box css={{ gap: "$2" }}>
            <Button
              variant={"primary"}
              css={{
                padding: "$1",
                border: "1px solid $fgAccentBorder",
                backgroundColor: "$fgAccent",
                fontSize: "$2",
                lineHeight: "$2",
                borderRadius: "$1",
                width: "fit-content",
                height: "25px",
              }}
              onClick={() => {
                setPhase("initial");
              }}
            >
              Widget
            </Button>
            /
            <Box
              css={{
                padding: "$1",
                border: "1px solid $fgAccentBorder",
                backgroundColor: "$fgAccent",
                fontSize: "$2",
                borderRadius: "$1",
                width: "fit-content",
              }}
            >
              Post
            </Box>
          </Box>
          <Title>Create a post</Title>
        </Box>
      );
  };
  return (
    <Dialog.Dialog
      onOpenChange={() => {
        setPhase("initial");
      }}
      title={getTitle()}
      showClose={false}
      trigger={
        <Button>
          <PlusIcon />
        </Button>
      }
    >
      {phase === "initial" && (
        <Box
          css={{
            gap: "$4",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => {
              setPhase("post");
            }}
            css={{
              width: "100%",
              height: "150px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pencil2Icon />
            Post
          </Button>
          <Dialog.DialogCloseButton asChild>
            <Button
              css={{
                width: "100%",
                height: "150px",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                onTodoWidgetAdd();
              }}
            >
              <ListBulletIcon />
              {"To-do list"}
            </Button>
          </Dialog.DialogCloseButton>
          <Button
            disabled
            muted
            css={{
              width: "100%",
              height: "150px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ChatBubbleIcon /> {"Chat (coming soon)"}
          </Button>
        </Box>
      )}
      {phase === "post" && (
        <>
          <Box
            css={{
              gap: "$3",
              flexDirection: "column",
            }}
          >
            <Label htmlFor="post">
              <TextArea
                value={post}
                placeholder="What are you thinking about?"
                id={"post"}
                onChange={(e) => {
                  setPost(e.currentTarget.value);
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
                onClick={() => {
                  onPostWidgetAdd(post);
                }}
              >
                Post
              </Button>
            </Dialog.DialogCloseButton>
          </Box>
        </>
      )}
    </Dialog.Dialog>
  );
};

export { WidgetDialog };
