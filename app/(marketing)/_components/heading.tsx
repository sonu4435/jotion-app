"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { ArrowRight } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import { SignInButton } from '@clerk/clerk-react'
import Link from "next/link";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4 ">
      <h1 className="text-3xl sm:5xl md:text-6xl font-bold">
        your idea, Documents & plans. unified . welcome to
        <span className="font-bold underline"> Jotion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Jotion is the connected workspace <br />
        where better, faster work happens.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner  size="lg"/>
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
          Enter Jotion
          <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading &&(
        <>
        <SignInButton mode="modal">
          <Button>
            Get Jotion Free
            <ArrowRight className="h-4 w-4 ml-2" ></ArrowRight>
          </Button>
        </SignInButton>
        
        </>)
      }
    </div>
  );
};

export default Heading;
