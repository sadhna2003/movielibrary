"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import { useAuth } from "@/hook/use-auth";

export const HeroSection = () => {
  const {
    isSignInDialogOpen,
    setIsSignInDialogOpen,
    isSignUpDialogOpen,
    setIsSignUpDialogOpen,
    isAuthenticated,
  } = useAuth();
  return (
    <>
      <section className="flex flex-col gap-6 w-full items-center justify-center h-full p-8 mx-auto container">
        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold">
          Discover Amazing Movies
        </h1>
        <p className="text-muted-foreground text-lg lg:text-xl">
          Rate, review, and explore thousands of movies. Join our community of
          film enthusiasts.
        </p>
        {!isAuthenticated && (
          <div className="flex flex-row justify-center items-center w-full gap-4">
            <Button size="lg" onClick={() => setIsSignUpDialogOpen(true)}>
              Get Started
            </Button>
            <Button
              size="lg"
              variant={"outline"}
              onClick={() => setIsSignInDialogOpen(true)}
            >
              Sign In
            </Button>
          </div>
        )}
      </section>

      <LoginForm
        openDialog={isSignInDialogOpen}
        setOpenDialog={setIsSignInDialogOpen}
      />

      <SignUpForm
        openDialog={isSignUpDialogOpen}
        setOpenDialog={setIsSignUpDialogOpen}
      />
    </>
  );
};
