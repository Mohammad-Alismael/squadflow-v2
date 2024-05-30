"use client";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

type AuthProviderProps = {
  children: ReactNode;
};

export const ReactQueryProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
