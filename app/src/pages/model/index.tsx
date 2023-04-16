import { NextPage } from "next";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react"
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { TreeModel } from "@/components/common/TreeModel";
import ThemeProvider from "@/components/context/TheamContext";
import { DataType, Field } from "@/@types/Model";
import { TableModel } from "@/components/common/DataTable/TableModel";

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
			
			<Box p={2} width="20%">
				<TreeModel model={model} name="user" />
			</Box>
			<Box p={2} width="80%">
				<TableModel />
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