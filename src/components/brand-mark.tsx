import { Scissors } from "lucide-react";

import { cn } from "@/lib/utils";

export function BrandMark({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_0_28px_rgba(139,92,246,.28)]">
        <Scissors aria-hidden="true" />
      </span>
      {compact ? null : (
        <span className="font-heading text-[15px] font-semibold tracking-[-0.02em]">
          AS <span className="text-muted-foreground">Barber Club</span>
        </span>
      )}
    </div>
  );
}

