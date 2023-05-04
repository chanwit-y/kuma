import { createContext, ReactNode, useCallback, useContext } from "react";
import { invoke } from "@tauri-apps/api/tauri"
import { Project } from "@/@types";
import { api } from "@/util/api";

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
	const project = api.project.createProject.useMutation();

	const createProject = useCallback(async (data: Project) => {
		project
			.mutate(data, {
				onSuccess: (res) => {
					invoke('go_mod_init')
						.then(console.log)
						.catch(console.error)
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