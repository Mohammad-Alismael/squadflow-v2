"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
