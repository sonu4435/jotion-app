"use client";

import {
  ChevronsLeft,
  Dot,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, useRef, useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useMutation } from "convex/react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import UserItem from "./UserItem";
import { api } from "@/convex/_generated/api";
import Items from "./Items";
import { toast } from "sonner";
import { DocumentList } from "./DocumentList";
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@radix-ui/react-popover";
import TrashBox from "./TrashBox";
import { useSearch } from "@/hooks/use-search";
import { UseSetting } from "@/hooks/use-settings";
import { Navbar } from "./Navbar";

const Navigation = () => {
  const search = useSearch();
  const setting = UseSetting();
  const params = useParams();
  const pathName = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const create = useMutation(api.documents.create);
  const router = useRouter();
  const resizeRef = useRef(false);
  const sideBarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  const [reSetting, setReSetting] = useState(false);
  const [isColapsed, setIsColapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      colapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);


    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
          if(isColapsed){
            resetWidth();
          }else{
            colapse();
          }
        }
      };
      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    });



  useEffect(() => {
    if (isMobile) {
      colapse();
    }
  }, [pathName, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    resizeRef.current = true;
    document.addEventListener("mousemove", handleMouaseMove);
    document.addEventListener("mouseup", handleMouaseUp);
  };

  const handleMouaseMove = (event: MouseEvent) => {
    if (!resizeRef.current) {
      return;
    }
    let newWwidth = event.clientX;

    if (newWwidth < 240) {
      newWwidth = 240;
    }
    if (newWwidth > 340) {
      newWwidth = 340;
    }

    if (sideBarRef.current && navbarRef.current) {
      sideBarRef.current.style.width = `${newWwidth}px`;
      navbarRef.current.style.setProperty("left", `${newWwidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWwidth}px)`
      );
    }
  };

  const handleMouaseUp = () => {
    resizeRef.current = false;
    document.removeEventListener("mousemove", handleMouaseMove);
    document.removeEventListener("mouseup", handleMouaseUp);
  };

  const resetWidth = () => {
    if (sideBarRef.current && navbarRef.current) {
      setIsColapsed(false);
      setReSetting(true);
      sideBarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => {
        setReSetting(false);
      }, 300);
    }
  };

  const colapse = () => {
    if (sideBarRef.current && navbarRef.current) {
      setIsColapsed(true);
      setReSetting(true);

      sideBarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => {
        setReSetting(false);
      }, 300);
    }
  };

  const handleCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) => {
      router.push(`/documents/${documentId}`)
    })

    toast.promise(promise, {
      loading: "Creating a new Note",
      success: "A new Note Created!",
      error: "Failed to create a new Note."
    });
  };
  return (
    <>
      <aside
        ref={sideBarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto  relative flex w-60 flex-col z-[99999]",
          reSetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          onClick={colapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div className="space-y-4">
          <UserItem />
          <Items
            label="Search"
            icon={Search}
            isSearch
            onClick={search.onOpen}
          />
          <div></div>
          <div className="flex items-center relative z-10 justify-between h-5 w-full">
            <Items label="Settings" icon={Settings} onClick={setting.onOpen} />
            <kbd className="flex absolute pointer-events-none items-center justify-end w-full h-5">
              <p className="text-xs font-mono font-normal border rounded-sm p-1 mr-3 h-full flex items-center dark:hover:bg-black text-neutral-400 hover:bg-neutral-50">CTRL + s</p>
            </kbd>
          </div>
          <Items onClick={handleCreate} label="New Page" icon={PlusCircle} />
        </div>
        <div className="mt-4">
          <DocumentList />
          <Items onClick={handleCreate} icon={Plus} label="Add a page" />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Items label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 bg-neutral-300 dark:bg-neutral-700 rounded-md w-72"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          reSetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isColapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="flex justify-between bg-transparent px-3 py-2 w-full">
            {isColapsed && (
              <>
                <MenuIcon
                  onClick={resetWidth}
                  role="button"
                  className="h-6 w-6 text-muted-foreground"
                />
              </>
            )}
            {isColapsed && <ModeToggle />}
          </nav>
        )}
      </div>
    </>
  );
};

export default Navigation;
