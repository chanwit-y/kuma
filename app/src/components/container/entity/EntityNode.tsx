import React, { memo } from 'react'
import { EntityItem } from './EntityItem'

type Props = {
	id?: string,
	data: any
}

export const EntityNode = memo(({id, data}: Props) => {
  return (
    <div>
	<EntityItem type='source' handleId={id} />
    </div>
  )
})
