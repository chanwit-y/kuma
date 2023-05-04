import { Project } from "@/@types";
import firebase from "@/util/common/firebase"

export const createProject = async (data: Project) => {
	console.log(data)
	await firebase.add("projects", data)
}