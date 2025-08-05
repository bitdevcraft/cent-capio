/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "better-auth/types";

import { emailFrom, resend } from "./email-config";

export const sendVerificationEmail = async (
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
  await resend.emails.send({
    from: emailFrom.noreply,
    subject: "Verification",
    text: `Click the link to verify your email: ${url}`,
    to: [user.email],
  });
};
