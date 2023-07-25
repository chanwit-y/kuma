import firebase from "@/util/common/firebase"

export const saveEntity = async (data: any) => {
	console.log('=========')
	console.log('saveEntity', data)
	await firebase.add("entities", data)
}