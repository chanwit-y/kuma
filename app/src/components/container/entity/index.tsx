import { memo } from "react"
import EntityProvider from "./Context"
import { Entity } from "./Entity"



export const EntityContainer = memo(() => {
	return (
		<EntityProvider>
			<Entity />
		</EntityProvider>
	)
})
