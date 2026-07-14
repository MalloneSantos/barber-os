"use client";

import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { filterRows } from "@/domain/search/filter-rows";

export function ModuleTable({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  const [query, setQuery] = useState("");
  const [highlightsOnly, setHighlightsOnly] = useState(false);
  const visibleRows = useMemo(() => {
    const filtered = filterRows(rows, query);
    return highlightsOnly ? filtered.slice(0, 3) : filtered;
  }, [rows, query, highlightsOnly]);

  return (
    <Card className="overflow-hidden border-white/8 py-0">
      <CardHeader className="border-b border-white/8 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div><CardTitle className="font-heading text-base">Visão operacional</CardTitle><CardDescription>{visibleRows.length} de {rows.length} registros</CardDescription></div>
        <div className="flex gap-2"><div className="relative"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar..." className="w-full pl-9 sm:w-56" /></div><Button type="button" variant={highlightsOnly ? "default" : "outline"} size="icon" aria-pressed={highlightsOnly} onClick={() => setHighlightsOnly((current) => !current)}><Filter /><span className="sr-only">Mostrar destaques</span></Button></div>
      </CardHeader>
      <CardContent className="p-0">
        <Table><TableHeader><TableRow>{columns.map((column) => <TableHead key={column}>{column}</TableHead>)}</TableRow></TableHeader><TableBody>{visibleRows.map((row, rowIndex) => <TableRow key={row.join("-")}>{row.map((cell, cellIndex) => <TableCell key={`${cell}-${cellIndex}-${rowIndex}`} className={cellIndex === 0 ? "font-medium" : "text-muted-foreground"}>{cellIndex === row.length - 1 ? <Badge variant="secondary">{cell}</Badge> : cell}</TableCell>)}</TableRow>)}</TableBody></Table>
        {visibleRows.length === 0 ? <div className="p-10 text-center text-sm text-muted-foreground">Nenhum registro corresponde à busca.</div> : null}
      </CardContent>
    </Card>
  );
}

