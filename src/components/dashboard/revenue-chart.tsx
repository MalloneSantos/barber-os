"use client";

import { useSyncExternalStore } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function RevenueChart({ data }: { data: { label: string; revenue: number }[] }) {
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  if (!mounted) return <div className="h-[250px] w-full rounded-xl bg-muted/20" aria-label="Carregando gráfico de faturamento" />;

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1} initialDimension={{ width: 800, height: 250 }}>
        <AreaChart data={data} margin={{ left: -24, right: 8, top: 12, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F5F5F5" stopOpacity={0.28} /><stop offset="100%" stopColor="#F5F5F5" stopOpacity={0} /></linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#858590", fontSize: 11 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "#858590", fontSize: 11 }} tickFormatter={(value) => `€${value / 1000}k`} />
          <Tooltip cursor={{ stroke: "rgba(255,255,255,.25)" }} contentStyle={{ background: "#171717", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, fontSize: 12 }} formatter={(value) => [`€ ${Number(value).toLocaleString("pt-BR")}`, "Receita"]} />
          <Area type="monotone" dataKey="revenue" stroke="#F5F5F5" strokeWidth={2.4} fill="url(#revenueFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
