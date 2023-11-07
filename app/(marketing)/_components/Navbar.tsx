"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scroll = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",
        scroll && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items gap-x-2">
        {isLoading && (
          <div className="flex items-center">
            <Spinner />
          </div>
        )}
        {!isAuthenticated && !isLoading && (
            <div className="flex items-center">
              <SignInButton mode="modal" afterSignInUrl="/documents">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button size="sm">Get Jotion free</Button>
              </SignInButton>
            </div>
        )}
        {isAuthenticated && !isLoading && (
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Jotion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
