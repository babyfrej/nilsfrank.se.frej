import z from "zod";

const envSchema = z.object({
  APP_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string(),
  DATABASE_AUTH_TOKEN: z.string(),
  EVENT_ID: z.string().default(""),

  NEXT_PUBLIC_COOKIE_CODE: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
