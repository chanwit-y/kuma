import React, { memo, useEffect } from 'react'
import { EntityItem } from './EntityItem'
import { Box, Divider, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'

import AddCircleIcon from '@mui/icons-material/AddCircle';
import BorderColorIcon from '@mui/icons-material/BorderColor';

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
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        bgcolor={blue[100]}
        sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2, }}>
        <Typography variant='subtitle1' letterSpacing={.5} p={.5} fontSize={8} fontWeight='bold'>{data.table.name}</Typography>
        <Box display='flex' mr={.5} gap={.5}>
          <BorderColorIcon sx={{fontSize: 10, color: grey[700]}} />
          <AddCircleIcon sx={{fontSize: 10, color: grey[700]}} />
        </Box>
      </Box>
      <Divider />
      <Box >
        {data.table.columns.map((c: any) => <>
          <EntityItem handleId={c.name} column={c} />

          {/* <Divider  /> */}
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
