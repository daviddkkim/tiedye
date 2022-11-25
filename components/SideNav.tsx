import React from "react";
import { styled } from "../stitches.config";
import { Button } from "./Button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "./Link";
import { PersonIcon, StackIcon, GearIcon, ChatBubbleIcon, PaperPlaneIcon, Pencil2Icon } from '@radix-ui/react-icons'
import { useRouter } from "next/router";

const NavContainer = styled('div', {
    display: 'flex',
    minHeight: '100vh',
    width: '232px',
    padding: '$4 $3',
    backgroundColor: '$bgSecondary',
    borderRight: '1px solid $separator',
    gap: '$4',
    flexDirection: 'column',
    justifyContent: 'space-between'
})

const NavTitle = styled('h1', {
    fontSize: '$4',
    color: '$textPrimary',
    fontWeight: '500',
    margin: 0
})

const Box = styled('div', {
    display: 'flex',
})
const SideNav = () => {
    const { logout, user } = useAuth0();
    const router = useRouter();

    const pathname = router.pathname;

    const handleActiveLink = (link: string) => {
        if (pathname.includes(link)) return true;

        if (pathname.length < 2 && link === 'rooms') return true;

        return false;
    }

    return (
        <NavContainer>
            <Box css={{
                flexDirection: 'column',
                height: '100%',
                gap: '$4'
            }}>
                <Box css={{
                    width: '100%',
                    justifyContent: 'space-between',
                }}>
                    <NavTitle>{'-'}</NavTitle>
                </Box>
                <Button> <Pencil2Icon /> Create Room </Button>
                <Box css={{
                    gap: '$1',
                    flexDirection: 'column'
                }}>
                    <Link variant={'tertiary'} href={'/rooms'} active={handleActiveLink('rooms')}> <StackIcon /> Rooms </Link>
                    <Link variant={'tertiary'} href={'/settings'} active={handleActiveLink('settings')}> <GearIcon /> Settings </Link>
                    <Link variant={'tertiary'} href={'/members'} active={handleActiveLink('members')} > <PersonIcon /> Members </Link>
                </Box>
            </Box>
            <Box css={{
                gap: '$1',
                flexDirection: 'column'
            }}>
                <Button variant={'tertiary'}> <PaperPlaneIcon /> Feedback </Button>
                <Button variant={'tertiary'}> <ChatBubbleIcon /> Help </Button>
            </Box>
            <Button onClick={() => { logout() }} > Log out </Button>

        </NavContainer>
    )
}

SideNav.displayName = "SideNav";

export {
    SideNav
}
