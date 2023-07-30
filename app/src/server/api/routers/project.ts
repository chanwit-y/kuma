import { getProjectById } from "./../service/project";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createProject } from "../service/project";

export const projectRouter = createTRPCRouter({
  createProject: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      console.log(input);
      await createProject(input);
      return {};
    }),
  getProjectById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await getProjectById(input);
  }),
});
