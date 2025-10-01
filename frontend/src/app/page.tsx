"use client";
import { ChangePasswordForm } from "@/components/common/ChangePasswordForm";
import { HeroSection } from "@/components/common/HeroSection";
import { MovieWrapperList } from "@/components/common/MovieWrapperList";
import { useAuth } from "@/hook/use-auth";

export default function Home() {
  const { isChangePasswordDialogOpen, setIsChangePasswordDialogOpen } =
    useAuth();
  return (
    <>
      <HeroSection />
      <MovieWrapperList />
      {isChangePasswordDialogOpen && (
        <ChangePasswordForm
          openDialog={isChangePasswordDialogOpen}
          setOpenDialog={setIsChangePasswordDialogOpen}
        />
      )}
    </>
  );
}
