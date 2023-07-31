import { memo } from "react"
import EntityProvider from "./Context"
import { Entity } from "./Entity"
import { ToolBox } from "./ToolBox"

export const EntityContainer = memo(() => {
	return (
		<EntityProvider id="iQOx8DzxLPhnAekTdNNw">
			<ToolBox />
			<Entity />
		</EntityProvider>
	)
})
