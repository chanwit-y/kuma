import { memo } from "react"
import EntityProvider from "./Context"
import { Entity } from "./Entity"
import { ToolBox } from "./ToolBox"

export const EntityContainer = memo(() => {
	return (
		<EntityProvider id="TFMRx9sQ7L4w9mO3M4vA">
			<ToolBox />
			<Entity />
		</EntityProvider>
	)
})
