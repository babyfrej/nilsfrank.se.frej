import { createDirectus, rest } from "@directus/sdk";
import { z } from "zod";
import { cache } from "react";

const schema = z.object({
  pages: z.object({
    title: z.string(),
    description: z.string(),
    blocks: z.array(z.any()),
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
});

type Schema = z.infer<typeof schema>;
export const client = cache(() =>
  createDirectus<Schema>("http://0.0.0.0:8055/").with(rest()),
);
