import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function QuickAppointment({ tenantSlug }: { tenantSlug: string }) {
  return <Button asChild><Link href={`/barbearia/${tenantSlug}/agendar`}><Plus data-icon="inline-start" /> Novo agendamento</Link></Button>;
}
