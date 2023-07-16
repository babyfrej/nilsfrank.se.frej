import z from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.string(),
  EVENT_ID: z.string().default(""),
});

export const ENV = envSchema.parse(process.env);
