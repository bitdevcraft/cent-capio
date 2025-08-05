/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "better-auth/types";

import { emailFrom, resend } from "./email-config";

export const sendResetPassword = async (
  {
    token,
    url,
    user,
  }: {
    token: string;
    url: string;
    user: User;
  },
  request: Request | undefined
) => {
  const ip =
    request?.headers.get("x-client-ip") ??
    request?.headers.get("x-forwarded-for") ??
    "";

  await resend.emails.send({
    from: emailFrom.noreply,
    subject: "Password Reset",
    text: `Click the link to verify your email: ${url}`,
    to: [user.email],
  });
};
