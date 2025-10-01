"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hook/use-auth";
import { Search, Film, User, Settings, LogOut, Plus, KeyRound } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { toast } from "sonner";
import { userSignOut } from "@/api/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


interface HeaderProps {
  onLogin: () => void;
  onSignup: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header() {
  const {
    isSignInDialogOpen,
    setIsSignInDialogOpen,
    isSignUpDialogOpen,
    setIsSignUpDialogOpen,
    isAuthenticated,
    logout,
    user,
    isChangePasswordDialogOpen,
    setIsChangePasswordDialogOpen,
  } = useAuth();
  const router = useRouter();
  const { data, mutate, isPending, isError, error } = useMutation({
    mutationFn: () => userSignOut(),
    onSuccess: (data: any) => {
      logout();
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });
  const handleLogout = () => {
    mutate();
  };
const handleChangePassword = () => {
  setIsChangePasswordDialogOpen(true);
}
  return (
    <>
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Film className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">MovieLib</span>
            </Link>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                {user?.role === "admin" && (
                  <Link href="/movies/add">
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Movie
                    </Button>
                  </Link>
                )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleChangePassword}>
                        <KeyRound className="mr-2 h-4 w-4" />
                        Change Password
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setIsSignInDialogOpen(true)}
                  >
                    Sign In
                  </Button>
                  <Button onClick={() => setIsSignUpDialogOpen(true)}>
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

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
}
