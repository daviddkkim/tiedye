import * as TogglePrimitives from "@radix-ui/react-toggle";
import { styled } from "../stitches.config";

const Toggle = styled(TogglePrimitives.Root, {
  unset: "all",
  backgroundColor: "$transparent",
  border: "none",
  width: "fit-content",
  padding: "$2",
  "&:hover": {
    backgroundColor: "$fgHover",
  },
});

export { Toggle };
