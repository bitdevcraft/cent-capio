import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import "dotenv/config";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    NODE_ENV: z.string(),
    POSTGRES_USER_ROLE: z.string(),
  },

  // eslint-disable-next-line perfectionist/sort-objects
  runtimeEnv: process.env,

  // eslint-disable-next-line perfectionist/sort-objects
  emptyStringAsUndefined: true,
});
