import React, { memo } from 'react'
import { Handle, HandleType, Position } from 'reactflow';

type Props = {
	type: HandleType;
	handleId?: string;
}

export const EntityItem = memo(({ type, handleId }: Props) => {
	return (
		<div>
			{handleId}
			<Handle type={type} position={Position.Right} id={handleId} />
		</div>
	)
})
