"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image1 from "../public/error.png";
import Image2 from "../public/error-dark.png";

const Error = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        alt="Error"
        src={Image1}
        height="300"
        width="300"
        className="dark:hidden"
      />
      <Image
        alt="Error"
        src={Image2}
        height="300"
        width="300"
        className="hidden"
      />
      <h2 className="text-xl font-medium">
        Something went wrong
      </h2>
      <Button asChild>
        <Link href="/documents">
            Go back
        </Link>
      </Button>
    </div>
  );
};

export default Error;
