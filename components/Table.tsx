import { styled } from "../stitches.config";

const Table = styled('table', {
    display: 'table',
    width: '100%',
})

const THead = styled('thead', {
    width: '100%',
    borderBottom: '1px solid $separator',
})

const TR = styled('tr', {
    height: '$6',
})

const TH = styled('th', {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '$2',
})

const TBody = styled('tbody', {
    width: '100%',

})

const TD = styled('td', {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '$2',
})

export { TH, TR, THead, TBody, TD, Table };
