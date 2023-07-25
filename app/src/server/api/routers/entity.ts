import { saveEntity } from './../service/entity';
import { createTRPCRouter, publicProcedure } from "../trpc"
import { z } from 'zod';

export const entityRouter = createTRPCRouter({
	saveEntity: publicProcedure
	.input(z.any())
	.mutation(async ({input}) => {
		console.log('mutation')
		await saveEntity(input);
		return {};
	})
})