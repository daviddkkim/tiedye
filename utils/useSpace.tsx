import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Document } from "../convex/_generated/dataModel";

interface AppContextInterface {
  space: Document<"spaces"> | null;
  setSpace: React.Dispatch<React.SetStateAction<Document<"spaces"> | null>>;
}
//Could pull this into a hook
const SpaceContext = createContext<AppContextInterface | null>(null);
export const SpaceContextProvider = ({ children }: { children: ReactNode }) => {
  const storedSpace = localStorage.getItem("space");
  const initialSpace = storedSpace ? JSON.parse(storedSpace) : null;
  const [space, setSpace] = useState<Document<"spaces"> | null>(initialSpace);
  useEffect(() => {
    localStorage.setItem("space", JSON.stringify(space));
  }, [space]);

  return (
    <SpaceContext.Provider value={{ space: space, setSpace: setSpace }}>
      {children}
    </SpaceContext.Provider>
  );
};

export const useSpace = () => {
  const context = useContext(SpaceContext);
  if (context) {
    return { space: context.space, setSpace: context.setSpace };
  } else {
    return { spaceId: null, setSpace: null };
  }
};
