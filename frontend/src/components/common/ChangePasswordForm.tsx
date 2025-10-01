import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "../ui/form";
import { FormInput } from "@/components/form/FormInput";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { changePassword, userSignOut } from "@/api/auth/auth.service";
import { is } from "zod/v4/locales";
import { Spinner } from "./Spinner";

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(16, "Password must be at most 16 characters"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(16, "Password must be at most 16 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be match with new password")
      .max(16, "Password must be at most 16 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ChangePasswordForm = ({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data: any) => {
      return await changePassword(data);
    },
    onSuccess: (data: any) => {
      setOpenDialog(false);
      form.reset();
      userSignOut();
      toast.success(data.message || "Password changed successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // console.log("submitted data", data);
    const formattedData = {
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    mutate(formattedData);
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            You can change your password here. After saving, you&apos;ll be
            logged out.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormInput
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />
            <FormInput
              name="newPassword"
              label="New Password"
              placeholder="New Password"
              type="password"
            />
            <FormInput
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                Save changes {isPending && <Spinner className="!w-4 !h-4 !p-2"/>}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
