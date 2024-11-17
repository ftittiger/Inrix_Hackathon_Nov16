import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col h-full">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 z-20 w-full">
        <div className="flex h-14 items-center w-full justify-between px-4">
          <div className="flex items-center justify-between w-full gap-2">
            <div className="relative z-20 flex items-center text-lg font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              Workfit
            </div>
            {/* <Link
              href="/sign-in"
              className={buttonVariants({
                variant: "ghost",
              })}
            >Sign in</Link> */}
          </div>
          <div />
        </div>
      </header>
      {children}
    </main>
  );
};

export default Layout;
