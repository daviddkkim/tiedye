import { styled } from "../stitches.config";

export const TextInput = styled("input", {
  boxSizing: "border-box",
  height: "$6",
  padding: "$2",
  fontSize: "$3",
  borderRadius: "$1",
  border: "1px solid $fgBorder",
  backgroundColor: "transparent",
  outline: "none",
  width: "100%",
  transition: "all 150ms ease",
  "&:hover": {
    borderColor: "$fgBorderHover",
  },
  "&:focus-visible": {
    borderColor: "$focusBorder",
    boxShadow: "0px 0px 0px 2px $colors$focusShadow",
  },
});
