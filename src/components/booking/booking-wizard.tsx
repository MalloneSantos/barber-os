"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarCheck, Check, CreditCard, ShieldCheck, UserRound } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { business, services, staff } from "@/data/demo";
import { cn } from "@/lib/utils";

const steps = ["Serviço", "Profissional", "Horário", "Seus dados", "Sinal"];
const dates = ["Qua 15", "Qui 16", "Sex 17", "Sáb 18"];
const times = ["09:00", "10:15", "11:30", "13:15", "14:45", "16:30", "17:15"];

export function BookingWizard() {
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState("cut");
  const [staffId, setStaffId] = useState("any");
  const [date, setDate] = useState(dates[0]);
  const [time, setTime] = useState("13:15");
  const [confirmed, setConfirmed] = useState(false);
  const service = useMemo(() => services.find((item) => item.id === serviceId) ?? services[0], [serviceId]);
  const selectedStaff = staff.find((item) => item.id === staffId);
  const deposit = 5;

  if (confirmed) return <Card className="panel-glow mx-auto max-w-xl border-primary/25 bg-primary/6"><CardContent className="flex flex-col items-center p-8 text-center sm:p-12"><div className="grid size-16 place-items-center rounded-full bg-[#B7F34A]/12 text-[#B7F34A]"><Check className="size-7" /></div><Badge className="mt-6">Reserva confirmada</Badge><h1 className="font-heading mt-4 text-3xl font-semibold">Sua cadeira está reservada.</h1><p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{service.name} · {date} às {time} com {selectedStaff?.name ?? "o primeiro profissional disponível"}.</p><div className="mt-7 w-full rounded-2xl border border-white/8 bg-black/15 p-4 text-left"><div className="flex justify-between text-sm"><span>Total</span><span>€ {service.price}</span></div><div className="mt-2 flex justify-between text-sm text-[#B7F34A]"><span>Sinal pago</span><span>− € {deposit}</span></div><Separator className="my-3" /><div className="flex justify-between font-medium"><span>Saldo no local</span><span>€ {service.price - deposit}</span></div></div><div className="mt-7 flex w-full flex-col gap-2 sm:flex-row"><Button asChild className="flex-1"><Link href="/">Ir para minha área</Link></Button><Button asChild variant="outline" className="flex-1"><Link href={`/barbearia/${business.slug}`}>Voltar à barbearia</Link></Button></div></CardContent></Card>;

  const next = () => setStep((current) => Math.min(4, current + 1));
  const previous = () => setStep((current) => Math.max(0, current - 1));

  return (
    <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1fr_340px]">
      <Card className="panel-glow border-white/10">
        <CardHeader className="border-b border-white/8"><div className="flex items-center justify-between"><div><CardTitle className="font-heading text-2xl">{steps[step]}</CardTitle><CardDescription>Passo {step + 1} de {steps.length}</CardDescription></div><span className="font-mono text-xs text-muted-foreground">{Math.round(((step + 1) / steps.length) * 100)}%</span></div><Progress value={((step + 1) / steps.length) * 100} className="mt-3 h-1" /></CardHeader>
        <CardContent className="p-5 sm:p-7">
          {step === 0 ? <div className="grid gap-3">{services.map((item) => <button type="button" key={item.id} onClick={() => setServiceId(item.id)} className={cn("flex items-center justify-between rounded-2xl border p-4 text-left transition-colors", serviceId === item.id ? "border-primary/50 bg-primary/8" : "border-white/8 hover:bg-white/[.025]")}><div><div className="flex items-center gap-2"><p className="font-medium">{item.name}</p>{item.popular ? <Badge>Popular</Badge> : null}</div><p className="mt-1 text-xs text-muted-foreground">{item.description}</p><p className="mt-2 font-mono text-[11px] text-muted-foreground">{item.duration} min</p></div><span className="font-heading text-lg font-semibold">€ {item.price}</span></button>)}</div> : null}
          {step === 1 ? <div className="grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => setStaffId("any")} className={cn("rounded-2xl border p-4 text-left", staffId === "any" ? "border-primary/50 bg-primary/8" : "border-white/8")}><div className="grid size-10 place-items-center rounded-full bg-primary/12 text-primary"><UserRound /></div><p className="mt-8 font-medium">Qualquer profissional</p><p className="mt-1 text-xs text-muted-foreground">O primeiro disponível para este horário.</p></button>{staff.map((member) => <button type="button" key={member.id} onClick={() => setStaffId(member.id)} className={cn("rounded-2xl border p-4 text-left", staffId === member.id ? "border-primary/50 bg-primary/8" : "border-white/8")}><Avatar><AvatarFallback style={{ color: member.color, backgroundColor: `${member.color}1c` }}>{member.initials}</AvatarFallback></Avatar><p className="mt-8 font-medium">{member.name}</p><p className="mt-1 text-xs text-muted-foreground">{member.role}</p></button>)}</div> : null}
          {step === 2 ? <div className="flex flex-col gap-6"><div><p className="mb-3 text-xs font-medium text-muted-foreground">Escolha o dia</p><ToggleGroup type="single" value={date} onValueChange={(value) => value && setDate(value)} className="grid grid-cols-4">{dates.map((item) => <ToggleGroupItem key={item} value={item} className="h-12">{item}</ToggleGroupItem>)}</ToggleGroup></div><div><p className="mb-3 text-xs font-medium text-muted-foreground">Horários disponíveis</p><ToggleGroup type="single" value={time} onValueChange={(value) => value && setTime(value)} className="grid grid-cols-3 gap-2 sm:grid-cols-4">{times.map((item) => <ToggleGroupItem key={item} value={item} className="font-mono">{item}</ToggleGroupItem>)}</ToggleGroup></div><div className="rounded-xl border border-primary/20 bg-primary/6 p-3 text-xs text-muted-foreground"><ShieldCheck className="mr-2 inline size-4 text-primary" /> A disponibilidade será validada novamente antes da confirmação.</div></div> : null}
          {step === 3 ? <FieldGroup><div className="grid gap-4 sm:grid-cols-2"><Field><FieldLabel htmlFor="firstName">Nome</FieldLabel><Input id="firstName" defaultValue="Guilherme" required /></Field><Field><FieldLabel htmlFor="lastName">Sobrenome</FieldLabel><Input id="lastName" defaultValue="Ferreira" required /></Field></div><Field><FieldLabel htmlFor="bookingEmail">E-mail</FieldLabel><Input id="bookingEmail" type="email" defaultValue="guilherme@exemplo.com" required /></Field><Field><FieldLabel htmlFor="phone">Telefone</FieldLabel><Input id="phone" type="tel" defaultValue="+32 470 00 00 00" required /></Field><Field orientation="horizontal"><Checkbox id="policy" defaultChecked /><FieldLabel htmlFor="policy" className="font-normal">Aceito a política de cancelamento de 24 horas.</FieldLabel></Field></FieldGroup> : null}
          {step === 4 ? <div className="flex flex-col gap-5"><div className="rounded-2xl border border-white/8 bg-black/15 p-5"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary"><CreditCard /></div><div><p className="font-medium">Sinal de reserva</p><p className="text-xs text-muted-foreground">Pagamento online simulado com segurança.</p></div></div><Separator className="my-5" /><div className="flex justify-between text-sm"><span>Valor do sinal</span><span className="font-heading text-xl font-semibold">€ {deposit}</span></div><p className="mt-2 text-xs text-muted-foreground">Este valor será abatido do total. Cancelando com 24h de antecedência, ele vira crédito.</p></div><FieldGroup><Field><FieldLabel htmlFor="card">Cartão de demonstração</FieldLabel><Input id="card" defaultValue="4242 4242 4242 4242" readOnly /></Field><div className="grid grid-cols-2 gap-4"><Field><FieldLabel htmlFor="expiry">Validade</FieldLabel><Input id="expiry" defaultValue="12/30" readOnly /></Field><Field><FieldLabel htmlFor="cvc">CVC</FieldLabel><Input id="cvc" defaultValue="123" readOnly /></Field></div></FieldGroup></div> : null}
          <div className="mt-8 flex items-center justify-between"><Button variant="ghost" onClick={previous} disabled={step === 0}><ArrowLeft data-icon="inline-start" /> Voltar</Button>{step < 4 ? <Button onClick={next}>Continuar <ArrowRight data-icon="inline-end" /></Button> : <Button onClick={() => { toast.loading("Processando sinal simulado...", { duration: 700 }); setTimeout(() => setConfirmed(true), 700); }}><CreditCard data-icon="inline-start" /> Pagar € {deposit}</Button>}</div>
        </CardContent>
      </Card>
      <Card className="h-fit border-white/8 lg:sticky lg:top-5"><CardHeader><CardTitle className="font-heading text-base">Resumo da reserva</CardTitle></CardHeader><CardContent className="flex flex-col gap-4"><div><p className="text-xs text-muted-foreground">Serviço</p><p className="mt-1 text-sm font-medium">{service.name}</p><p className="text-xs text-muted-foreground">{service.duration} min</p></div><Separator /><div><p className="text-xs text-muted-foreground">Profissional</p><p className="mt-1 text-sm font-medium">{selectedStaff?.name ?? "Qualquer disponível"}</p></div><div><p className="text-xs text-muted-foreground">Data e horário</p><p className="mt-1 text-sm font-medium">{date} · {time}</p></div><Separator /><div className="flex justify-between text-sm"><span>Total</span><span>€ {service.price}</span></div><div className="flex justify-between text-sm text-muted-foreground"><span>Sinal agora</span><span>€ {deposit}</span></div><div className="flex justify-between font-medium"><span>No local</span><span>€ {service.price - deposit}</span></div><div className="rounded-xl bg-[#B7F34A]/8 p-3 text-xs leading-5 text-[#B7F34A]"><CalendarCheck className="mr-2 inline size-4" /> Confirmação imediata após o sinal.</div></CardContent></Card>
    </div>
  );
}

