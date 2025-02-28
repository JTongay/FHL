import { FHL, FHLContext } from "@/context/FHLContext";
import { useContext } from "react";

export function useFhl(): FHL {
  const context = useContext(FHLContext);

  if (!context) {
    throw new Error("useFhl must be used within a FHLContext");
  }

  if (!context.fhl) {
    context.refetch();
  }

  return context.fhl as FHL;
}
