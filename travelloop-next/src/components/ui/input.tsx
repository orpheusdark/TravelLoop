import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-foreground placeholder:text-slate-300/80 backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 html.light:bg-white/90 html.light:border-slate-200 html.light:placeholder:text-slate-500",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
