import React, { memo, useEffect, useState, MouseEvent, useCallback, use, useMemo } from 'react'
import { EntityItem } from './EntityItem'
import { Box, Divider, IconButton, InputBase, Popover, TextField, Typography } from '@mui/material'
import { blue, green, grey, purple, red, yellow } from '@mui/material/colors'

import { ColumnInfo } from './ColumnInfo';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import { FormInputBase } from '@/components/form/components/FormInputBase';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { FormSetting } from '@/components/form/FormSetting';
import { schema } from './Form.schema';

type Props = {
  id?: string,
  data: any
}

export const EntityNode = memo(({ data }: Props) => {
  const [isRename, setIsRename] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const formSetting = useForm(FormSetting.getDefaultForm(schema, { name: data.table.name }));
  // const { append, remove, fields } = useFieldArray({ control: formSetting.control, name: "columns" })

  // const columnCounter = useMemo(() => fields.length, [fields]);

  const handleRename = () => setIsRename(true)
  // const handleAddColumn = (event: MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget)
  //   append({});
  // }

  const handleAddColumn = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    console.log("handleAddColumn");
    // append({});
    setAnchorEl(event.currentTarget)
  }, []);

  // useEffect(() => {
  //   console.log("columnCounter", columnCounter);
  // }, [columnCounter]);

  const handlePopoverClose = useCallback(() => {
    // remove(columnCounter - 1);
    setAnchorEl(null)
  }, []);
  // }, [columnCounter]);

  const open = Boolean(anchorEl);
  const id = open ? 'edit-column-popover' : undefined;

  const [d] = useState(data);

  return (
    <FormProvider {...formSetting} >
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
              alignItems='center'
              gap={.5}
              sx={{
                py: .1,
                px: .5,
                m: .4,
                borderRadius: .5,
                bgcolor: blue[50],
                // transition: "opacity 0.5s ease"
              }}>
              {/* add FormInputBase */}
              <FormInputBase name="name" />
              {/* <InputBase
                value={d.table.name}
                sx={{
                  borderRadius: .5,
                  bgcolor: blue[50],
                  fontSize: 7,
                }} /> */}
              <IconButton size='small' sx={{ p: 0, height: 8 }}  >
                <CheckIcon sx={{ fontSize: 8, color: green["A700"] }} />
              </IconButton>
              <IconButton size='small' sx={{ p: 0, height: 8 }} onClick={() => setIsRename(false)}  >
                <CloseIcon sx={{ fontSize: 8, color: red["A700"] }} />
              </IconButton>
            </Box>
            : <Typography variant='subtitle1' letterSpacing={.5} p={.5} fontSize={8} fontWeight='bold'>
              {formSetting.watch('name')}
            </Typography>
        }

        <Box display='flex' mr={.5} gap={.5}>

          {
            !isRename && <IconButton size='small' sx={{ p: 0, mx: .1 }} onClick={handleRename} >
              <BorderColorIcon sx={{ fontSize: 8, color: blue[900] }} />
            </IconButton>
          }

          <IconButton size='small' sx={{ p: 0, mx: .1 }} onClick={handleAddColumn} >
            <AddCircleIcon sx={{ fontSize: 8, color: green[700] }} />
          </IconButton>
          <IconButton size='small' sx={{ p: 0, mx: .1 }}  >
            <CancelIcon sx={{ fontSize: 8, color: red[700] }} />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            transformOrigin={{
              // vertical: 'top',
              vertical: 'center',
              horizontal: 'left',
            }}
          >
            <ColumnInfo onPopoverClose={handlePopoverClose}  />
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
      {JSON.stringify(formSetting.watch(), undefined, 2)}
    </FormProvider>
  )
})
