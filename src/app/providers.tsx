"use client";

import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TaskProvider } from "./context/TasksContext.jsx";
import { Toaster } from "react-hot-toast";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TaskProvider>
        <Toaster />
        <NextUIProvider>{children}</NextUIProvider>
      </TaskProvider>
    </AuthProvider>
  );
}
