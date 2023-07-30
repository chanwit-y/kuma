import { Project } from "@/@types";
import firebase from "@/util/common/firebase"

export const createProject = async (data: Project) => {
	console.log(data)
	await firebase.add("projects", data)
}

export const getProjectById = async (id: string) => {
	return await firebase.findById("projects", id)
}