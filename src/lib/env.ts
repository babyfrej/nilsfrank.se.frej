import z from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.string(),
  EVENT_ID: z.string().default(""),

  ORIGIN: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_COOKIE_CODE: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
