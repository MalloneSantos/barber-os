"use client";

import { useActionState, useMemo, useState } from "react";
import { Archive, Filter, Gift, PackagePlus, Search } from "lucide-react";

import { adjustInventoryAction, archiveModuleRecordAction, redeemRewardAction, type ModuleActionState } from "@/app/(dashboard)/actions";
import { AppointmentCancelButton } from "@/components/dashboard/appointment-actions";
import { EditModuleRecordDialog } from "@/components/dashboard/module-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { filterRows } from "@/domain/search/filter-rows";
import type { ModuleSlug } from "@/server/data/module-data";

type Row = { id: string; cells: string[]; edit?: Record<string, string | number> };
const initialState: ModuleActionState = { status: "idle" };
const archiveModules: ModuleSlug[] = ["clientes", "equipe", "servicos", "produtos"];

function ArchiveButton({ id, module }: { id: string; module: "clientes" | "equipe" | "servicos" | "produtos" }) {
  const [state, action, pending] = useActionState(archiveModuleRecordAction, initialState);
  return <form action={action} className="flex flex-col items-end gap-1"><input type="hidden" name="id" value={id} /><input type="hidden" name="module" value={module} /><Button type="submit" size="sm" variant="ghost" disabled={pending}><Archive data-icon="inline-start" />Arquivar</Button>{state.message ? <span className={state.status === "success" ? "text-[10px] text-primary" : "text-[10px] text-destructive"}>{state.message}</span> : null}</form>;
}

function InventoryButton({ productId }: { productId: string }) {
  const [state, action, pending] = useActionState(adjustInventoryAction, initialState);
  return <form action={action} className="flex items-center justify-end gap-1"><input type="hidden" name="productId" value={productId} /><input type="hidden" name="reason" value="Ajuste rápido no módulo de produtos" /><Input aria-label="Quantidade do ajuste" name="quantity" type="number" defaultValue="1" className="h-8 w-16" /><Button type="submit" size="sm" variant="outline" disabled={pending}><PackagePlus /><span className="sr-only">Ajustar estoque</span></Button>{state.message ? <span className={state.status === "success" ? "max-w-28 text-[10px] text-primary" : "max-w-28 text-[10px] text-destructive"}>{state.message}</span> : null}</form>;
}

function RedeemButton({ customerId }: { customerId: string }) {
  const [state, action, pending] = useActionState(redeemRewardAction, initialState);
  return <form action={action} className="flex flex-col items-end gap-1"><input type="hidden" name="customerId" value={customerId} /><Button type="submit" size="sm" variant="outline" disabled={pending}><Gift data-icon="inline-start" />Resgatar</Button>{state.message ? <span className={state.status === "success" ? "max-w-36 text-right text-[10px] text-primary" : "max-w-36 text-right text-[10px] text-destructive"}>{state.message}</span> : null}</form>;
}

function RowActions({ row, module }: { row: Row; module: ModuleSlug }) {
  if (module === "agendamentos") return <AppointmentCancelButton appointmentId={row.id} />;
  if (module === "produtos") return <div className="flex flex-wrap items-start justify-end gap-1">{row.edit ? <EditModuleRecordDialog module="produtos" id={row.id} defaults={row.edit} /> : null}<InventoryButton productId={row.id} /><ArchiveButton id={row.id} module="produtos" /></div>;
  if (module === "fidelidade") return <RedeemButton customerId={row.id} />;
  if (archiveModules.includes(module)) return <div className="flex flex-wrap items-start justify-end gap-1">{row.edit ? <EditModuleRecordDialog module={module as "clientes" | "equipe" | "servicos"} id={row.id} defaults={row.edit} /> : null}<ArchiveButton id={row.id} module={module as "clientes" | "equipe" | "servicos"} /></div>;
  return null;
}

export function ModuleTable({ module, columns, rows, canMutate }: { module: ModuleSlug; columns: readonly string[]; rows: Row[]; canMutate: boolean }) {
  const [query, setQuery] = useState("");
  const [highlightsOnly, setHighlightsOnly] = useState(false);
  const hasActions = canMutate && (["agendamentos", "clientes", "equipe", "servicos", "produtos", "fidelidade"] as ModuleSlug[]).includes(module);
  const visibleRows = useMemo(() => {
    const filtered = rows.filter((row) => filterRows([row.cells], query).length > 0);
    return highlightsOnly ? filtered.slice(0, 3) : filtered;
  }, [rows, query, highlightsOnly]);

  return <Card className="overflow-hidden border-white/8 py-0"><CardHeader className="border-b border-white/8 py-5 sm:flex-row sm:items-center sm:justify-between"><div><CardTitle className="font-heading text-base">Visão operacional</CardTitle><CardDescription>{visibleRows.length} de {rows.length} registros</CardDescription></div><div className="flex gap-2"><div className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar..." className="w-full pl-9 sm:w-56" /></div><Button type="button" variant={highlightsOnly ? "default" : "outline"} size="icon" aria-pressed={highlightsOnly} onClick={() => setHighlightsOnly((current) => !current)}><Filter /><span className="sr-only">Mostrar destaques</span></Button></div></CardHeader><CardContent className="p-0"><Table><TableHeader><TableRow>{columns.map((column) => <TableHead key={column}>{column}</TableHead>)}{hasActions ? <TableHead className="text-right">Ações</TableHead> : null}</TableRow></TableHeader><TableBody>{visibleRows.map((row) => <TableRow key={row.id}>{row.cells.map((cell, cellIndex) => <TableCell key={`${row.id}-${cellIndex}`} className={cellIndex === 0 ? "font-medium" : "text-muted-foreground"}>{cellIndex === row.cells.length - 1 ? <Badge variant="secondary">{cell}</Badge> : cell}</TableCell>)}{hasActions ? <TableCell className="text-right"><RowActions row={row} module={module} /></TableCell> : null}</TableRow>)}</TableBody></Table>{visibleRows.length === 0 ? <div className="p-10 text-center text-sm text-muted-foreground">Nenhum registro corresponde à busca.</div> : null}</CardContent></Card>;
}
