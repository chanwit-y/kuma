import firebase from "@/util/common/firebase"

export const createEntity = async (data: any) => {
	console.log(data)
	await firebase.add("entities", data)
}

export const updateEntity = async (id: string, data: any) => {
	await firebase.update("entities", id, "nodes", data)
}

export const getEntity = async (id: string) => {
	return await firebase.findById("entities", id);
}