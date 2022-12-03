import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

interface AppContextInterface {
    spaceId: string | null;
    setSpaceId: React.Dispatch<React.SetStateAction<string | null>>;
}
//Could pull this into a hook
const SpaceContext = createContext<AppContextInterface | null>(null);
export const SpaceContextProvider = ({ children }: { children: ReactNode }) => {
    const storedSpace = localStorage.getItem("space");
    const initialSpace = storedSpace ? storedSpace : null;

    const [spaceId, setSpaceId] = useState<string | null>(initialSpace);

    useEffect(() => {
        if (spaceId) {
            localStorage.setItem("space", spaceId);
        }
    }, [spaceId]);

    return (
        <SpaceContext.Provider value={{ spaceId: spaceId, setSpaceId: setSpaceId }}>
            {children}
        </SpaceContext.Provider>
    );
};

export const useSpace = () => {
    const context = useContext(SpaceContext);
    if (context) {
        return { spaceId: context.spaceId, setSpaceId: context.setSpaceId };
    } else {
        return { spaceId: null, setSpaceId: null };
    }
};
