import React, { useState } from "react";
import { Dialog, DropdownMenu, Label, TextInput } from "..";
import { useMutation, useQuery } from "../../convex/_generated/react";
import { useSpace } from "../../utils/useSpace";
import { Button } from "../Button";
import { Document } from "../../convex/_generated/dataModel";
import {
  CaretDownIcon,
  Cross2Icon,
  PlusIcon,
  EnterIcon,
} from "@radix-ui/react-icons";
import { styled } from "../../stitches.config";
import { useRouter } from "next/router";

const Box = styled("div", {
  display: "flex",
});

const Title = styled("h1", {
  fontSize: "$4",
  color: "$textPrimary",
  fontWeight: "400",
  margin: 0,
});

const SpaceDropdown = () => {
  const { spaceId, setSpaceId } = useSpace();
  const spaces = useQuery("getSpaces");
  const createSpace = useMutation("createSpace");
  const joinSpace = useMutation("joinSpace");
  const [modalOpen, setModalOpen] = useState(false);
  const [joinSpaceModalOpen, setJoinSpaceModalOpen] = useState(false);
  const [spaceName, setSpaceName] = useState("");
  const [joinSpaceId, setJoinSpaceId] = useState("");
  const router = useRouter();

  const handleItemClick = (clickedSpace: Document<"spaces">) => {
    const clickedSpaceId = clickedSpace._id.toString();
    if (clickedSpaceId === spaceId) return;
    setSpaceId && setSpaceId(clickedSpaceId);
    router.push("/");
  };

  const handleCreateSpace = () => {
    const spaceObject = {
      name: spaceName,
      members: [],
    };
    createSpace(spaceObject);
    setModalOpen(false);
  };

  const getCurrentSpaceName = () => {
    const matchSpace = spaces?.filter((space) => {
      return space?._id.toString() === spaceId;
    })[0];
    return matchSpace?.name;
  };

  if (!spaces) return <div>...</div>;

  return (
    <>
      <Dialog.DialogRoot open={modalOpen}>
        <Dialog.DialogPortal>
          <Dialog.DialogOverlay />
          <Dialog.DialogContent
            onEscapeKeyDown={() => {
              setModalOpen(false);
            }}
            onInteractOutside={() => {
              setModalOpen(false);
            }}
          >
            <Box
              css={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Title>Create a space</Title>
              <Button
                variant="tertiary"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                <Cross2Icon />
              </Button>
            </Box>
            <Box
              css={{
                gap: "$3",
                flexDirection: "column",
              }}
            >
              <Label htmlFor="roomName">
                Space name
                <TextInput
                  value={spaceName}
                  placeholder="space for my friends and me"
                  id={"roomName"}
                  onChange={(e) => {
                    setSpaceName(e.currentTarget.value);
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
              <Button
                variant={"tertiary"}
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleCreateSpace();
                }}
              >
                Save
              </Button>
            </Box>
          </Dialog.DialogContent>
        </Dialog.DialogPortal>
      </Dialog.DialogRoot>
      <Dialog.DialogRoot open={joinSpaceModalOpen}>
        <Dialog.DialogPortal>
          <Dialog.DialogOverlay />
          <Dialog.DialogContent
            onEscapeKeyDown={() => {
              setJoinSpaceModalOpen(false);
            }}
            onInteractOutside={() => {
              setJoinSpaceModalOpen(false);
            }}
          >
            <Box
              css={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Title>Join a space</Title>
              <Button
                variant="tertiary"
                onClick={() => {
                  setJoinSpaceModalOpen(false);
                }}
              >
                <Cross2Icon />
              </Button>
            </Box>
            <Box
              css={{
                gap: "$3",
                flexDirection: "column",
              }}
            >
              <Label htmlFor="spaceId">
                Space ID
                <TextInput
                  value={joinSpaceId}
                  placeholder="Ask your friends for the Space ID from their settings page"
                  id={"spaceId"}
                  onChange={(e) => {
                    setJoinSpaceId(e.currentTarget.value);
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
              <Button
                variant={"tertiary"}
                onClick={() => {
                  setJoinSpaceModalOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  joinSpace(joinSpaceId)
                    .then(() => {
                      setJoinSpaceModalOpen(false);
                      setJoinSpaceId("");
                    })
                    .catch(() => {
                      alert("You're already part of this space");
                    });
                }}
              >
                Save
              </Button>
            </Box>
          </Dialog.DialogContent>
        </Dialog.DialogPortal>
      </Dialog.DialogRoot>
      <DropdownMenu.Root
        trigger={
          <Button
            stretch
            css={{
              justifyContent: "space-between",
            }}
          >
            {spaces && getCurrentSpaceName()}
            <CaretDownIcon />
          </Button>
        }
      >
        <DropdownMenu.RadioGroup>
          {spaces &&
            spaces.map((space) => {
              if (space) {
                const spaceId = space._id.toString();
                return (
                  <DropdownMenu.RadioItem
                    onClick={() => {
                      handleItemClick(space);
                    }}
                    value={spaceId}
                    key={spaceId}
                  >
                    {space?.name}
                  </DropdownMenu.RadioItem>
                );
              }
            })}
        </DropdownMenu.RadioGroup>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          onClick={() => {
            setJoinSpaceModalOpen(true);
          }}
        >
          <EnterIcon /> Join a space
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <PlusIcon /> Create a space
        </DropdownMenu.Item>
      </DropdownMenu.Root>
    </>
  );
};

export { SpaceDropdown };
