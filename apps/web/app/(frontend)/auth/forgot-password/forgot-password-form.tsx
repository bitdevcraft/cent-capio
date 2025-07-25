"use client";

import { Button } from "@repo/ui/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/shadcn/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/shadcn/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ForgotPasswordPayload,
  type ForgotPasswordResponse,
  ForgotPasswordSchema,
} from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@repo/ui/components/shadcn/input";
import axios from "axios";

export const useForgotPasswordMutation = () => {
  const mutation = useMutation({
    mutationFn: async (
      payload: ForgotPasswordPayload
    ): Promise<ForgotPasswordResponse> => {
      return await axios.post("/api/auth/forgot-password", {
        body: payload,
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return mutation;
};

export const ForgotPasswordForm = () => {
  const t = useTranslations("auth");

  const form = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
    reValidateMode: "onChange",
  });

  const forgotPassword = useForgotPasswordMutation();
  const onSubmit: SubmitHandler<ForgotPasswordPayload> = (data) => {
    forgotPassword.mutate(data);
  };

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{t("forgot_password.title")}</CardTitle>
        <CardDescription>{t("forgot_password.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("forgot_password.form.email.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={forgotPassword.data === true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={forgotPassword.data === true}
                className="w-full"
              >
                {forgotPassword.data === true &&
                  t("forgot_password.form.link_sent")}

                {!forgotPassword.data &&
                  t("forgot_password.form.send_reset_link")}
              </Button>

              {forgotPassword.data === true && (
                <span className="text-center text-sm text-muted-foreground">
                  {t("forgot_password.form.check_inbox")}
                </span>
              )}
            </div>
            <div className="mt-4 text-center text-sm">
              <Link href="/auth/login" className="ml-1 underline">
                {t("login_button")}
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
