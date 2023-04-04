import { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import Editor from "@monaco-editor/react"
import dayjs from "dayjs";

const Model: NextPage = () => {
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
		}


		return type;
	}

	return <div className="flex justify-between">
		<Editor
			width="50%"
			height="80vh"
			language="json"
			value={code}
			theme="Blackboard"
			defaultValue=""
			onChange={(c) => setCode(c ?? "{}")}
		/>
		<div className="w-full">
			<pre>
				{JSON.stringify(JSON.parse(code), undefined, 2)}
			</pre>
		</div>
	</div>
}

export default Model;