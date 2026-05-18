import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium", className)} {...props} />;
}
