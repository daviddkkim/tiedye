import React from "react";
import { styled } from "../../stitches.config";
import { Button, Link, Toggle, SpaceDropdown, DropdownMenu } from "..";
import { useAuth0 } from "@auth0/auth0-react";
import { useTheme } from "next-themes";
import {
  BoxIcon,
  GearIcon,
  CaretDownIcon,
  TokensIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/router";

const NavContainer = styled("div", {
  position: 'sticky',
  height: 'fit-content',
  display: "flex",
  width: "fit-content",
  padding: "$2",
  backgroundColor: "$bgSecondary",
  border: "1px solid $separator",
  borderRadius: '$1',
  gap: "$4",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: ' center',
  zIndex: '9999'
});

const NavTitle = styled("h1", {
  fontSize: "$4",
  color: "$textPrimary",
  fontWeight: "400",
  margin: 0,
});

const Box = styled("div", {
  display: "flex",
});
const SideNav = () => {
  const { logout, user } = useAuth0();

  const { setTheme } = useTheme();
  const router = useRouter();

  const pathname = router.pathname;
  const handleActiveLink = (link: string) => {
    if (pathname.includes(link)) return true;
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem("space");
    logout();
  };

  return (
    <Box css={{
      position: 'absolute',
      top: '$4',
      left: '$7',
    }}>
      <NavContainer>
        <Box
          css={{
            flexDirection: "row",
            gap: "$4",
          }}
        >
          <Box
            css={{
              gap: "$1",
              flexDirection: "row",
            }}
          >
            <Link
              variant={"tertiary"}
              href={"/rooms"}
              active={handleActiveLink("rooms")}
            >
              {" "}
              <BoxIcon /> Rooms{" "}
            </Link>
            <Link
              variant={"tertiary"}
              href={"/feed"}
              active={handleActiveLink("feed")}
            >
              {" "}
              <TokensIcon /> Feed{" "}
            </Link>
            <Link
              variant={"tertiary"}
              href={"/settings"}
              active={handleActiveLink("settings")}
            >
              {" "}
              <GearIcon /> Settings{" "}
            </Link>
          </Box>
        </Box>
        <DropdownMenu.DropdownMenu trigger={
          <Button
            variant={'tertiary'}>
            <Box css={{
              size: '$4',
              borderRadius: '$round',
              background: 'linear-gradient(0deg,$colors$sand9, $colors$yellow11 )',
            }}>
            </Box>
            <CaretDownIcon />
          </Button>
        }>
          <Toggle
            onPressedChange={(pressed) => {
              pressed ? setTheme("light") : setTheme("dark");
            }}
            css={{
              width: '100%',
              fontSize: '$3',
              "&:hover": {
                backgroundColor: '$fgHoverStrong'
              }
            }}
          >
            Change theme
          </Toggle>
          <DropdownMenu.Item onClick={() => {
            handleLogout();
          }}>
            Log out
          </DropdownMenu.Item>
        </DropdownMenu.DropdownMenu>
      </NavContainer>
    </Box>
  );
};

SideNav.displayName = "SideNav";

export { SideNav };
