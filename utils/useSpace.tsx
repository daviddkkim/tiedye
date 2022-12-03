import { GenericId } from "convex/dist/types/values/values";
import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from "react";
import { Document } from "../convex/_generated/dataModel";



interface AppContextInterface {
    space: Document<"spaces"> | null;
    setSpace: React.Dispatch<React.SetStateAction<{
        _id: GenericId<"spaces">;
        _creationTime: number;
        name: string;
        owner: GenericId<"users">;
        members: GenericId<"users">[];
    } | null>>;
}
//Could pull this into a hook
const SpaceContext = createContext<AppContextInterface | null>(null);
export const SpaceContextProvider = ({ children }: { children: ReactNode }) => {

    const [space, setSpace] = useState<Document<"spaces"> | null>(null)

    return (
        <SpaceContext.Provider value={{ space: space, setSpace: setSpace }}>
            {children}
        </SpaceContext.Provider>)

};

export const useSpace = () => {
    const context = useContext(SpaceContext)
    if(context) {
    return { space: context.space, setSpace: context.setSpace };
    } else {
        return { spaceId: null, setSpace: null }
    }
} 