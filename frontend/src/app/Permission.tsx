import { useAuth } from "@/hook/use-auth";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export const Permission = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const checkPermission = () => {
    // check role/permission
    if (allowedRoles.includes(user?.role ?? "")) {
      setIsAllowed(true);
    } else {
      router.push("/forbidden"); // 🚫 not authorized
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      checkPermission();
    } else {
      setIsAllowed(false);
      router.push("/")
    }
  }, [isAuthenticated, user, router]);

  // show nothing while checking
  if (isAllowed === null) return null;
  return <>{isAllowed && children}</>;
};
