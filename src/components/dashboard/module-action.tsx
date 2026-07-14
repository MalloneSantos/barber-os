"use client";

import { Download, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function ModuleAction({ label }: { label: string }) {
  const exportAction = label.includes("CSV");
  return <Button onClick={() => toast.success(exportAction ? "Relatório exportado" : "Ação concluída", { description: exportAction ? "O arquivo CSV foi preparado para download." : `${label} foi registrado na demonstração.` })}>{exportAction ? <Download data-icon="inline-start" /> : <Plus data-icon="inline-start" />}{label}</Button>;
}

