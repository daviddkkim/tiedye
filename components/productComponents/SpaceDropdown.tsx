import React from "react";
import { DropdownMenu } from "..";
import { useQuery } from "../../convex/_generated/react";
import { useSpace } from "../../utils/useSpace";
import { Button } from "../Button";
import { Document } from "../../convex/_generated/dataModel";
import { CaretDownIcon } from "@radix-ui/react-icons";

const SpaceDropdown = () => {
  const { spaceId, setSpaceId } = useSpace();
  const spaces = useQuery("getSpaces");

  const handleItemClick = (clickedSpace: Document<"spaces">) => {
    const clickedSpaceId = clickedSpace._id.toString();
    if (clickedSpaceId === spaceId) return;
    setSpaceId && setSpaceId(clickedSpaceId);
  };

  const getCurrentSpaceName = () => {
    const matchSpace = spaces?.filter((space) => {
      return space?._id.toString() === spaceId;
    })[0];
    return matchSpace?.name;
  };

  if (!spaces) return <div>...</div>;

  return (
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
    </DropdownMenu.Root>
  );
};

export { SpaceDropdown };
