import { api } from "@/util/api";
import { createContext, ReactNode, useContext, useEffect } from "react";

type ProjectContextType = {};
const ProjectContext = createContext<ProjectContextType>(
	{} as ProjectContextType
);

type Props = {
	children: ReactNode;
};
const ProjectProvider = ({ children }: Props) => {
	const hello = api.example.hello.useQuery({ text: "from tRPC" });

	useEffect(() => {
		console.log(hello.data)
	}, [hello])

	return (
		<ProjectContext.Provider value={{}}>{children}</ProjectContext.Provider>
	);
};

export const useProject = () => useContext(ProjectContext);
export default ProjectProvider;