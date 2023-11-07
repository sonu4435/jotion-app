"use client";

import { useState, useEffect } from "react";
import { SettingsModal } from "../models/setting-modal";
import { UseSetting } from "@/hooks/use-settings";
import { CoverImageModal } from "../models/cover-image-modal";

export const Modelprovider = () => {
  const toggle = UseSetting((store) => store.toggle);
  const [isMounted, setIsMounded] = useState(false);

  useEffect(() => {
    setIsMounded(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
};
