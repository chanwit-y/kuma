import React, { memo, useEffect } from 'react'
import { EntityItem } from './EntityItem'
import { Box, Divider, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'

type Props = {
  id?: string,
  data: any
}

export const EntityNode = memo(({ id, data }: Props) => {

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    // <Box p={1} width={120} height="auto" bgcolor="white">
    <Box >
      <Box bgcolor={blue[100]} sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2, }}>
        <Typography variant='subtitle1' letterSpacing={.5} p={.5} fontSize={8}>{data.table.name}</Typography>
      </Box>
      <Divider />
      <Box >
        {data.table.columns.map((c: any) => <>
          <EntityItem  handleId={c.name} column={c} />
          <Divider />
        </>)}
        {/* {JSON.stringify(data.table, undefined, 2)}
        {/* <EntityItem type='source' handleId={id} />
        <Divider />
        <EntityItem type='source' handleId={id} />
        <Divider />
        <EntityItem type='source' handleId={id} /> */}
      </Box>
    </Box>
  )
})
