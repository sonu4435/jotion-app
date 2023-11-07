"use client";

import React, { useEffect } from "react";
import homeImg from '../../../../public/empty.png'
import darkHomeImg from '../../../../public/empty-dark.png'
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocPage = () => {

  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) => {
      router.push(`/documents/${documentId}`)
    })

    toast.promise(promise, {
      loading: "Creating a new Note",
      success: "A new Note Created!",
      error: "Failed to create a new Note."
    })
  }



  return (
    <>
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Image
          className="block dark:hidden pointer-events-none select-none"
          src={homeImg}
          height="300"
          width="300"
          alt="Empty"
        />
        <Image
          className="hidden dark:block pointer-events-none select-none"
          src={darkHomeImg}
          height="300"
          width="300"
          alt="Empty"
        />

        <h2 className="text-lg font-medium">
          welcome to {user?.firstName}&apos;s Jotion
        </h2>
        <Button onClick={onCreate}>
          <PlusCircleIcon className="h-4 w-4 mr-2" />
          Create a note
        </Button>
      </div>
    </>
  );
};

export default DocPage;
