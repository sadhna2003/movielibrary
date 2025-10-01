"use client";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  // Create a client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        gcTime: 1000 * 60 * 15,
        staleTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Provider;