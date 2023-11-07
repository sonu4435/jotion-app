"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import Title from "./Title";
import Banner from "./Banner";
import { Menu } from "./Menu";
import Publish from "./Publish";

interface Navbarprops {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const Navbar = ({ isCollapsed, onResetWidth }: Navbarprops) => {
  const params = useParams();
  const documents = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">
  });

  if (documents === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (documents === null) {
    return null;
  }
  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 ml-2 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialDeta={documents} />
          <div className="flex items-center gap-x-2">
            <Publish initialDeta={documents}/>
            <Menu documentId={documents._id}/>
          </div>
        </div>
      </nav>
      {documents.isArchived && (
        <Banner documentId={documents._id}/>
      )}
    </>
  );
};
