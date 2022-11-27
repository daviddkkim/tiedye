import React from "react";
import * as DropdownMenuPrimitives from "@radix-ui/react-dropdown-menu";
import { styled } from "../stitches.config";

const StyledDropdownMenuContent = styled(DropdownMenuPrimitives.Content, {
  padding: "$1",
  display: "flex",
  flexDirection: "column",
  borderRadius: "$1",
  backgroundColor: "$fg",
  border: "$separator",
});

const DropdownMenuLabel = styled(DropdownMenuPrimitives.Label, {
  fontSize: "$3",
  color: "$textSecondary",
});

const DropdownMenuGroup = styled(DropdownMenuPrimitives.Group, {
  display: "flex",
  flexDirection: "column",
});

const DropdownMenuItem = styled(DropdownMenuPrimitives.Item, {
  display: "flex",
  gap: "$2",
  alignItems: "center",
  padding: "$2",
  fontSize: "$3",
  lineHeight: "$3",
  borderRadius: "$1",
  color: "$textPrimary",
});

interface DropdownMenuProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
}

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ children, trigger }, ref) => {
    return (
      <DropdownMenuPrimitives.Root>
        <DropdownMenuPrimitives.Trigger asChild>
          {trigger}
        </DropdownMenuPrimitives.Trigger>
        <DropdownMenuPrimitives.Portal>
          <StyledDropdownMenuContent>{children}</StyledDropdownMenuContent>
        </DropdownMenuPrimitives.Portal>
      </DropdownMenuPrimitives.Root>
    );
  }
);

DropdownMenu.displayName = "DropdownMenu";

const Item = DropdownMenuItem;
const Group = DropdownMenuGroup;
const Label = DropdownMenuLabel;

export {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuProps,
  DropdownMenuLabel,
  Item,
  Group,
  Label,
};
