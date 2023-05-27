import { createContext, ReactNode, useContext } from "react";

type EntityContextType = {};
const EntityContext = createContext<EntityContextType>(
  {} as EntityContextType
);

type Props = {
  children: ReactNode;
};
const EntityProvider = ({ children }: Props) => {
  return (
    <EntityContext.Provider value={{}}>{children}</EntityContext.Provider>
  );
};

export const useEntity = () => useContext(EntityContext);
export default EntityProvider;
