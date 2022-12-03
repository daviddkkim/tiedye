import React from 'react';
import { DropdownMenu } from '..';
import { useQuery } from '../../convex/_generated/react';
import { useSpace } from '../../utils/useSpace';
import { Button } from '../Button';
import { Document } from "../../convex/_generated/dataModel";


const SpaceDropdown = () => {

    const { space, setSpace } = useSpace();
    const spaces = useQuery("getSpaces");

    const handleItemClick = (clickedSpace: Document<"spaces">) => {
        if (clickedSpace._id.toString() === space?._id.toString()) return;
        setSpace && setSpace(clickedSpace)
    }

    return (

        <DropdownMenu.Root trigger={
            <Button>{space && space.name}</Button>
        }>
            {spaces && spaces.map((space) => {
                if (space) {
                    return (
                        <DropdownMenu.Item onClick={() => { handleItemClick(space) }}>
                            {space?.name}
                        </DropdownMenu.Item>
                    )
                }
            })}
        </DropdownMenu.Root>

    )
}

export { SpaceDropdown }