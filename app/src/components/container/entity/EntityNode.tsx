import React, { memo, useEffect, useState, MouseEvent } from 'react'
import { EntityItem } from './EntityItem'
import { Box, Divider, IconButton, InputBase, Popover, TextField, Typography } from '@mui/material'
import { blue, green, grey, red } from '@mui/material/colors'

import AddCircleIcon from '@mui/icons-material/AddCircle';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { ColumnInfo } from './ColumnInfo';

type Props = {
  id?: string,
  data: any
}

export const EntityNode = memo(({ data }: Props) => {
  const [isRename, setIsRename] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleRename = () => setIsRename(true)
  const handleAddColumn = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'edit-column-popover' : undefined;

  const [d, setD] = useState(data);


  return (
    // <Box p={1} width={120} height="auto" bgcolor="white">
    <Box >
      
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        bgcolor={blue[100]}
        sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2, }}>
        {
          isRename
            ? <Box
              display="flex"
              gap={.2}
              sx={{
                py: .1,
                px: .5,
                m: .4,
                borderRadius: .5,
                bgcolor: blue[50],
                // transition: "opacity 0.5s ease"
              }}>
              <InputBase
                value={d.table.name}
                sx={{
                  borderRadius: .5,
                  bgcolor: blue[50],
                  fontSize: 7,
                }} />
              <IconButton size='small' sx={{ p: .5 }}  >
                <CheckIcon sx={{ fontSize: 9, color: green["A700"] }} />
              </IconButton>
              <IconButton size='small' sx={{ p: .5 }} onClick={() => setIsRename(false)}  >
                <CloseIcon sx={{ fontSize: 9, color: red["A700"] }} />
              </IconButton>
            </Box>
            : <Typography variant='subtitle1' letterSpacing={.5} p={.5} fontSize={8} fontWeight='bold'>
              {d.table.name}
            </Typography>
        }

        <Box display='flex' mr={.5} gap={.5}>

          {
            !isRename && <IconButton size='small' sx={{ p: 0, mx: .1 }} onClick={handleRename} >
              <BorderColorIcon sx={{ fontSize: 8, color: grey[700] }} />
            </IconButton>
          }

          <IconButton size='small' sx={{ p: 0, mx: .1 }} onClick={handleAddColumn} >
            <AddCircleIcon sx={{ fontSize: 8, color: grey[700] }} />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <ColumnInfo />
          </Popover>
        </Box>
      </Box>
      <Divider />
      <Box py={.5} >
        {d.table.columns.map((c: any) => <>
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
