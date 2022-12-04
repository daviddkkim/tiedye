import Link from "next/link";
import { styled } from "../stitches.config";

const Table = styled("div", {
  display: "table",
  width: "100%",
  border: "1px solid $separator",
  borderRadius: "$1",
});

const THeadRow = styled("div", {
  width: "100%",
  height: "$6",
  display: "table-row",
});

const TRlink = styled(Link, {
  height: "$6",
  display: "table-row",
  outline: "none",
  "&:hover": {
    backgroundColor: "$fgHover",
  },
  boxShadow: "0px 1px $colors$separator",
  "&:last-child": {
    boxShadow: "none",
  },
  "&:focus-visible": {
    borderColor: "$focusBorder",
    boxShadow: "0px 0px 0px 2px $colors$focusShadow",
  },
});

const TH = styled("div", {
  justifyContent: "flex-start",
  textAlign: "start",
  alignItems: "center",
  padding: "$3 $5",
  fontSize: "$2",
  fontWeight: 500,
  color: "$textSecondary",
  display: "table-cell",
});

const TBody = styled("div", {
  width: "100%",
});

const TD = styled("div", {
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "$2 $5",
  display: "table-cell",
});

export { TH, TRlink, THeadRow, TBody, TD, Table };
