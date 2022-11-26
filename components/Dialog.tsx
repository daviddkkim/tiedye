import { keyframes, styled } from "../stitches.config";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {Cross2Icon } from '@radix-ui/react-icons';
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
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});


const StyledContent = styled(DialogPrimitive.Content, {
  background: "$bgPrimary",
  borderRadius: 6,
  border: "1px solid $mauve4",
  boxShadow: "rgb(0 0 0 / 20%) 0px 4px 6px",
  padding: '$3',
  display:'flex',
  flexDirection: 'column',
  gap: '$3',
  position: "fixed",
  top: "15%",
  left: "50%",
  maxWidth: "650px",
  width: '100%',
  transform: "translateX(-50%)",
  "&:focus": { outline: "none" },
});
const Box = styled('div', {
    display: 'flex',
})

interface DialogProps {
    open: boolean;
    children: React.ReactNode;
    trigger: React.ReactNode;
    title: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({
    open = false,   
    children,
    trigger,
    title
}) => {
    
  if(!open) return null; 

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        {trigger}
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <StyledOverlay />
        <StyledContent>
            <Box css={{
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {title}
                <Button variant='tertiary'>
                    <Cross2Icon />
                </Button>
            </Box>
            {children}
        </StyledContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
export default Dialog;
