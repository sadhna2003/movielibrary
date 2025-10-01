"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "../ui/form";
import { FormInput } from "@/components/form/FormInput";
import { on } from "events";
import { userSignIn } from "@/api/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/hook/use-auth";
const formSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(16),
});
export const LoginForm = ({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { login, setIsSignUpDialogOpen } = useAuth();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { data, mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => userSignIn(data),
    onSuccess: (data: any) => {
      login(data.user, data.token);
      setOpenDialog(false);
      form.reset();
      toast.success(data.message || "Account created successfully");
    },
    onError: (error: any) => {
       form.reset();
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("submitted data", data);
    mutate(data);
  };

  const onClose = () => {
    setOpenDialog(false);
    form.reset();
  };
  const handleSignUp = () => {
    setOpenDialog(false);
    setIsSignUpDialogOpen(true);
  }
  return (
    <Dialog open={openDialog} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <DialogFooter className="w-full">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Loading..." : "Login"}
              </Button>
            </DialogFooter>
            <hr />
            <p className="text-center">
              Don't have an account?{" "}
              <Button
                type="button"
                className="underline cursor-pointer bg-transparent text-black p-1 hover:bg-transparent"
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
