"use client";

import { Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function WaitlistOfferButton({ customer }: { customer: string }) {
  return <Button size="sm" variant="outline" onClick={() => toast.success("Oportunidade enviada", { description: `${customer} tem 10 minutos para aceitar a vaga.` })}><Send data-icon="inline-start" /> Oferecer</Button>;
}

