"use client";
// Importing Navbar component for application navigation
import Navbar from "@/components/Navbar/Navbar";
// Importing global CSS styles
import "./globals.css";
// Importing required modules for React Query state management
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

/**
 * RootLayout Component
 * Wraps the app with essential providers and layout structure.
 */
export default function RootLayout({ children }) {
  // Initialize QueryClient for managing server state
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        {/* Navigation bar for app-wide navigation */}
        <Navbar />
        {/* React Query provider for state and caching */}
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
