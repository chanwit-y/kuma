import React from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic';
import { Box } from '@mui/material';


const EntityContainer = dynamic(() => import('@/components/container/entity').then((module) => module.EntityContainer), {
	ssr: true, // Disable SSR and use CSR
      });

type Props = {}

const Entity: NextPage<Props> = ({ }: Props) => {

	return (
		<Box width="100vw" height="100vh">
			<EntityContainer />
		</Box>
	)
}

export default Entity;




