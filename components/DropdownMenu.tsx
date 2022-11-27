import React from "react";
import * as DropdownMenuPrimitives from "@radix-ui/react-dropdown-menu";
import { styled } from "../stitches.config";

const StyledDropdownMenuContent = styled(DropdownMenuPrimitives.Content, {
  padding: "$1",
  display: "flex",
  flexDirection: "column",
  opacity:0.98,
  borderRadius: "$1",
  backgroundColor: "$fg",
  border: "1px solid $separator",
  width:'100%',
  minWidth: '120px'
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
  outline: 'none',
  "&:focus-visible": {
    borderColor: "$focusBorder",
    boxShadow: "0px 0px 0px 2px $colors$focusShadow",
  },
  variants: {
    muted: {
        true: {
            color: '$textMuted'
        },
        false: {
            "&:hover": {
                backgroundColor: "$fgHoverStrong",
        },
        }
    }
  },
  defaultVariants: {
    muted: 'false'
  }
});

interface DropdownMenuProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  sideOffset?: number
}

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ children, trigger, sideOffset=4 }, ref) => {
    return (
      <DropdownMenuPrimitives.Root >
        <DropdownMenuPrimitives.Trigger asChild>
          {trigger}
        </DropdownMenuPrimitives.Trigger>
        <DropdownMenuPrimitives.Portal>
          <StyledDropdownMenuContent ref={ref} sideOffset={sideOffset} align={'start'}>{children}</StyledDropdownMenuContent>
        </DropdownMenuPrimitives.Portal>
      </DropdownMenuPrimitives.Root>
    );
  }
);

DropdownMenu.displayName = "DropdownMenu";

const Root = DropdownMenu
const Item = DropdownMenuItem;
const Group = DropdownMenuGroup;
const Label = DropdownMenuLabel;

export {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuProps,
  DropdownMenuLabel,
  Root,
  Item,
  Group,
  Label,
};
