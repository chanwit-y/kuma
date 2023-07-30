import { getEntity, createEntity, updateEntity } from "./../service/entity";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const entityRouter = createTRPCRouter({
  createEntity: publicProcedure.input(z.any()).mutation(async ({ input }) => {
    console.log("mutation");
    await createEntity(input);
    return {};
  }),
  updateEntity: publicProcedure.input(z.object({
	id: z.string(),
	nodes: z.any()
  })).mutation(async ({input}) => {
	await updateEntity(input.id, input.nodes)
	return {}
  }),
  getEntity: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await getEntity(input);
  }),
});
