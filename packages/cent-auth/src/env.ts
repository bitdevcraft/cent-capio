import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    BASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url(),
    EMAIL_DOMAIN: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
  },

  // eslint-disable-next-line perfectionist/sort-objects
  runtimeEnv: process.env,

  // eslint-disable-next-line perfectionist/sort-objects
  emptyStringAsUndefined: true,
});
