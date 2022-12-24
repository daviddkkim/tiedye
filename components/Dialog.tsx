import React from "react";
import { keyframes, styled } from "../stitches.config";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "./Button";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: "$overlay",
  backdropFilter: "blur(0.5px)",
  position: "fixed",
  inset: 0,
  zIndex: 10,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  background: "$bgPrimary",
  borderRadius: 6,
  border: "1px solid $mauve4",
  boxShadow: "rgb(0 0 0 / 20%) 0px 4px 6px",
  padding: "$3",
  display: "flex",
  lineHeight: "150%",
  flexDirection: "column",
  gap: "$4",
  position: "fixed",
  top: "15%",
  left: "50%",
  maxWidth: "650px",
  width: "100%",
  zIndex: 11,
  transform: "translateX(-50%)",
  "&:focus": { outline: "none" },
});
const Box = styled("div", {
  display: "flex",
});

interface DialogProps {
  //open?: boolean;
  children: React.ReactNode;
  trigger: React.ReactNode;
  title: React.ReactNode;
  closeOnClickOutside?: boolean;
  showClose?: boolean;
  onOpenChange?: (open: boolean) => void;
  fitContent?: boolean;
}

//why is the open commented out? it's just being used uncontrolled for now;

const Dialog: React.FC<DialogProps> = ({
  //open = false,
  children,
  trigger,
  title,
  closeOnClickOutside = true,
  showClose = true,
  onOpenChange,
  fitContent = false,
}) => {
  return (
    <DialogPrimitive.Root onOpenChange={onOpenChange}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <StyledOverlay />
        <StyledContent
          onInteractOutside={(event) => {
            closeOnClickOutside ? null : event.preventDefault();
          }}
          css={{
            width: fitContent ? "fit-content" : "100%",
          }}
        >
          <Box
            css={{
              alignItems: "center",
              justifyContent: "space-between",
              gap: "$4",
            }}
          >
            {title}
            {showClose && (
              <DialogPrimitive.Close asChild>
                <Button variant="tertiary">
                  <Cross2Icon />
                </Button>
              </DialogPrimitive.Close>
            )}
          </Box>
          {children}
        </StyledContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

const DialogCloseButton = DialogPrimitive.Close;
const DialogContent = StyledContent;
const DialogOverlay = StyledOverlay;
const DialogRoot = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const Trigger = DialogPrimitive.DialogTrigger;
export {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogRoot,
  DialogPortal,
  DialogCloseButton,
  Trigger,
};
