import { Scissors } from "lucide-react";

import { cn } from "@/lib/utils";

export function BrandMark({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="grid size-9 place-items-center rounded-full border border-current/20 bg-current text-background">
        <Scissors className="size-4" aria-hidden="true" />
      </span>
      {compact ? null : (
        <span className="text-[13px] font-semibold uppercase tracking-[.16em]">
          AS <span className="font-normal opacity-55">Barber Club</span>
        </span>
      )}
    </div>
  );
}
