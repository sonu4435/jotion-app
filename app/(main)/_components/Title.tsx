import { Doc } from "@/convex/_generated/dataModel";
import React, { ChangeEvent, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Titleprops {
  initialDeta: Doc<"documents">;
}

const Title = ({ initialDeta }: Titleprops) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const update = useMutation(api.documents.update);

  const [title, setTitle] = useState(initialDeta.title || "Untitled");
  const [isEditing, setisEditing] = useState(false);

  const enableInput = () => {
    setTitle(initialDeta.title);
    setisEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setisEditing(false);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    update({
      id: initialDeta._id,
      title: event.target.value || "Untitled"
    });
  };

  const onkeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };
  return (
    <div className="flex items-center gap-x-1">
      {!!initialDeta.icon && <p>{initialDeta.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onkeydown}
          value={title}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className="font-normal h-auto p-1"
        >
          <span className="truncate">{initialDeta?.title}</span>
        </Button>
      )}
    </div>
  );
};

export default Title;

Title.Skeleton = function TitleSkeleton(){
    return (
        <Skeleton className="h-9 w-20 rounded-md"/>
    )
}