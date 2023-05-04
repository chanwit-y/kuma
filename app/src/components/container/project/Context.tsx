import { Project } from "@/@types";
import { api } from "@/util/api";
import { createContext, ReactNode, useCallback, useContext, useEffect } from "react";

type ProjectContextType = {
	createProject: (data: Project) => Promise<void>;
};
const ProjectContext = createContext<ProjectContextType>(
	{} as ProjectContextType
);

type Props = {
	children: ReactNode;
};
const ProjectProvider = ({ children }: Props) => {
	// const hello = api.example.hello.useQuery({ text: "from tRPC" });

	// useEffect(() => {
	// 	console.log(hello.data)
	// }, [hello])

	const project = api.project.createProject.useMutation();

	const createProject = useCallback(async (data: Project) => {
		project
			.mutate(data, {
				onSuccess: (res) => {
					console.log(res);
				},
				onError: (e) => {
					console.log(e);
				},
			});
	}, [project])

	return (
		<ProjectContext.Provider value={{
			createProject
		}}>{children}</ProjectContext.Provider>
	);
};

export const useProject = () => useContext(ProjectContext);
export default ProjectProvider;