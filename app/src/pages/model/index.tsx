import { NextPage } from "next";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react"
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { TreeModel } from "@/components/common/TreeModel";
import ThemeProvider from "@/components/context/TheamContext";
import { DataType, Field } from "@/@types/Model";

const Model: NextPage = () => {
	const [model, setModel] = useState<Field[]>([
		{
			name: "id",
			dataType: DataType.Int,
			fields: [],
		},
		{
			name: "name",
			dataType: DataType.String,
			fields: [],
		},
		{
			name: "roles",
			dataType: DataType.ArrayOfObject,
			objectName: "Role",
			fields: [
				{
					name: "role_name",
					dataType: DataType.String,
					fields: []
				},
				{
					name: "can_create",
					dataType: DataType.Boolean,
					fields: []
				},
			]
		}
	])
	const [code, setCode] = useState('{"data": ""}')

	useEffect(() => {
		const jsonCode = JSON.parse(code)
		console.log(jsonCode)

		Object.entries(jsonCode).map(([k, v]) => {
			console.log(v, getDataType(v as string))
		})


	}, [code])

	const getDataType = (v: string) => {
		const type = typeof v;
		const dayVal = dayjs(v)
		if (type === "string") {
			if (!isNaN(Number(v)))
				return type
			else if (dayVal.isValid())
				return "datetime"
		} else if (type === "object") {

		}


		return type;
	}

	return <ThemeProvider>
		<Box display="flex" justifyContent="space-around">
			<Box width="40%">
				<Editor
					width="100%"
					height="80vh"
					language="json"
					value={code}
					theme="Blackboard"
					defaultValue=""
					onChange={(c) => setCode(c ?? "{}")}
				/>
			</Box>
			<Box p={2} width="20%">
			</Box>
			<Box p={2} width="40%">
				<TreeModel model={model} name="user" />
			</Box>
			{/* <div className=" w-2/4">
			<pre>
				{JSON.stringify(JSON.parse(code), undefined, 2)}
			</pre>
			</div> */}
		</Box>
	</ThemeProvider>
}

export default Model;