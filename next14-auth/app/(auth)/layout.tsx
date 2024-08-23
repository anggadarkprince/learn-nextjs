import type { Metadata } from "next";
import "../globals.css";
import {logout} from "@/actions/auth-action";

export const metadata: Metadata = {
  title: "Next Auth Content",
  description: "Next.js Authentication",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
          <header id="auth-header">
              <p>Welcome back!</p>
              <form action={logout}>
                  <button>Logout</button>
              </form>
          </header>
          {children}
      </>
  );
}
