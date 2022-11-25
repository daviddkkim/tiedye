import { styled } from "../stitches.config";

export const Button = styled('button', {
    unset: 'all',
    fontSize: '$3',
    height: '$6',
    transition: 'all 200ms ease-out',
    border: '1px solid transparent',
    borderRadius: '$1',
    padding: '$2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    variants: {
        variant: {
            primary: {
                backgroundColor: '$fgAccent',
                borderColor: '$fgAccentBorder',
                color: '$fgAccentText',
                '&:hover': {
                    backgroundColor: '$fgAccentHover',
                    borderColor: '$fgAccentBorderHover',
                }
            },
            secondary: {
                backgroundColor: '$fg',
                borderColor: '$fgBorder',
                color: '$fgText',
                '&:hover': {
                    backgroundColor: '$fgHover',
                    borderColor: '$fgBorderHover',
                }
            },

        }
    },
    defaultVariants: {
        variant: 'secondary'
    }
})
