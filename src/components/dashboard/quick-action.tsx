"use client";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function QuickAppointment() {
  return (
    <Dialog>
      <DialogTrigger asChild><Button><Plus data-icon="inline-start" /> Novo agendamento</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Novo agendamento</DialogTitle><DialogDescription>Registre rapidamente uma reserva ou cliente sem horário.</DialogDescription></DialogHeader>
        <form onSubmit={(event) => { event.preventDefault(); toast.success("Agendamento criado", { description: "A reserva foi adicionada à agenda de hoje." }); }}>
          <FieldGroup>
            <Field><FieldLabel htmlFor="quickCustomer">Cliente</FieldLabel><Input id="quickCustomer" placeholder="Nome ou telefone" required /></Field>
            <div className="grid gap-4 sm:grid-cols-2"><Field><FieldLabel htmlFor="quickTime">Horário</FieldLabel><Input id="quickTime" type="time" defaultValue="16:30" required /></Field><Field><FieldLabel htmlFor="quickService">Serviço</FieldLabel><Input id="quickService" defaultValue="Corte Signature" required /></Field></div>
          </FieldGroup>
          <DialogFooter className="mt-6"><Button type="submit">Salvar agendamento</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

