import { createContext, ReactNode, useContext } from "react";

type ProjectContextType = {};
const ProjectContext = createContext<ProjectContextType>(
  {} as ProjectContextType
);

type Props = {
  children: ReactNode;
};
const ProjectProvider = ({ children }: Props) => {
  return (
    <ProjectContext.Provider value={{}}>{children}</ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
export default ProjectProvider;