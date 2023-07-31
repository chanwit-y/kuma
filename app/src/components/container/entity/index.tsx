import { memo } from "react"
import EntityProvider from "./Context"
import { Entity } from "./Entity"
import { ToolBox } from "./ToolBox"

export const EntityContainer = memo(() => {
	return (
		<EntityProvider id="ksuzK5dyHkmKOnEHZs9p">
			<ToolBox />
			<Entity />
		</EntityProvider>
	)
})
