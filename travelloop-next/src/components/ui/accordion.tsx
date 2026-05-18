"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({
  items
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <button
            type="button"
            key={item.question}
            className="w-full rounded-2xl border border-white/20 bg-white/8 p-4 text-left backdrop-blur transition hover:bg-white/12"
            onClick={() => setOpen(isOpen ? null : index)}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-medium">{item.question}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
            </div>
            <div className={cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr] pt-3" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden text-sm text-slate-300">{item.answer}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
