"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Gift,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  Package,
  Scissors,
  Search,
  Settings,
  Sparkles,
  Users,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { BrandMark } from "@/components/brand-mark";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { DemoSession } from "@/server/auth/session";

const primaryNavigation = [
  { href: "/painel", label: "Visão geral", icon: LayoutDashboard },
  { href: "/agenda", label: "Agenda", icon: CalendarDays },
  { href: "/agendamentos", label: "Agendamentos", icon: Scissors },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/equipe", label: "Equipe", icon: UserRound },
  { href: "/servicos", label: "Serviços", icon: Scissors },
  { href: "/fila-de-espera", label: "Fila de espera", icon: Sparkles, badge: "3" },
] as const;

const growthNavigation = [
  { href: "/campanhas", label: "Campanhas", icon: Megaphone },
  { href: "/fidelidade", label: "Fidelidade", icon: Gift },
  { href: "/produtos", label: "Produtos", icon: Package },
  { href: "/financeiro", label: "Financeiro", icon: CircleDollarSign },
  { href: "/relatorios", label: "Relatórios", icon: BarChart3 },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const renderGroup = (items: readonly { href: string; label: string; icon: typeof LayoutDashboard; badge?: string }[]) => items.map((item) => {
    const Icon = item.icon;
    const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
    return (
      <Button key={item.href} asChild variant="ghost" className={cn("h-10 w-full justify-start px-3 text-muted-foreground", active && "bg-sidebar-accent text-sidebar-accent-foreground")}>
        <Link href={item.href} onClick={onNavigate}><Icon data-icon="inline-start" />{item.label}{item.badge ? <Badge className="ml-auto h-5 min-w-5 justify-center px-1.5">{item.badge}</Badge> : null}</Link>
      </Button>
    );
  });
  return <nav className="flex flex-col gap-1"><p className="px-3 pb-1 pt-4 text-[10px] font-medium uppercase tracking-[.18em] text-muted-foreground/65">Operação</p>{renderGroup(primaryNavigation)}<p className="px-3 pb-1 pt-5 text-[10px] font-medium uppercase tracking-[.18em] text-muted-foreground/65">Crescimento</p>{renderGroup(growthNavigation)}</nav>;
}

export function DashboardShell({ children, session }: { children: React.ReactNode; session: DemoSession }) {
  const initials = session.name.split(" ").map((part) => part[0]).slice(0, 2).join("");
  const [globalQuery, setGlobalQuery] = useState("");
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[244px] border-r border-sidebar-border bg-sidebar/95 p-3 backdrop-blur-xl lg:flex lg:flex-col">
        <Link href="/painel" className="px-2 py-3"><BrandMark /></Link>
        <div className="mt-2 flex-1 overflow-y-auto"><NavLinks /></div>
        <div className="rounded-2xl border border-white/8 bg-primary/8 p-3">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium"><Sparkles className="size-4 text-primary" /> Insight do dia</div>
          <p className="text-xs leading-5 text-muted-foreground">5 horários livres amanhã podem gerar até € 160.</p>
          <Button asChild variant="link" size="sm" className="mt-1 h-auto px-0 text-xs"><Link href="/campanhas">Criar campanha</Link></Button>
        </div>
        <Button asChild variant="ghost" className="mt-2 w-full justify-start text-muted-foreground"><Link href="/configuracoes"><Settings data-icon="inline-start" /> Configurações</Link></Button>
      </aside>

      <div className="lg:pl-[244px]">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-white/8 bg-background/82 px-4 backdrop-blur-xl sm:px-6">
          <Sheet>
            <SheetTrigger asChild><Button variant="outline" size="icon" className="lg:hidden"><Menu /><span className="sr-only">Abrir navegação</span></Button></SheetTrigger>
            <SheetContent side="left" className="w-[290px] p-3"><SheetHeader className="px-2"><SheetTitle className="sr-only">Navegação</SheetTitle><BrandMark /></SheetHeader><NavLinks /></SheetContent>
          </Sheet>
          <div className="relative hidden max-w-sm flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input aria-label="Buscar no sistema" value={globalQuery} onChange={(event) => setGlobalQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && globalQuery.trim()) toast.info(`Busca por “${globalQuery.trim()}”`, { description: "6 clientes e 2 reservas correspondentes na demonstração." }); }} placeholder="Buscar clientes, reservas..." className="border-white/8 bg-white/[.025] pl-9" />
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Tooltip><TooltipTrigger asChild><Button type="button" variant="ghost" size="icon" className="relative" onClick={() => toast("3 notificações novas", { description: "Uma confirmação, uma vaga liberada e um alerta de estoque." })}><Bell /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" /><span className="sr-only">Notificações</span></Button></TooltipTrigger><TooltipContent>3 notificações novas</TooltipContent></Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="ghost" className="h-10 gap-2 px-2"><Avatar className="size-7"><AvatarFallback className="bg-primary/15 text-[10px] text-primary">{initials}</AvatarFallback></Avatar><span className="hidden text-left text-xs md:block"><span className="block font-medium">{session.name}</span><span className="block text-[10px] text-muted-foreground">AS Barber Club</span></span><ChevronDown className="hidden size-3 text-muted-foreground md:block" /></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56"><DropdownMenuLabel>{session.email}</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuGroup><DropdownMenuItem><UserRound /> Meu perfil</DropdownMenuItem><DropdownMenuItem asChild><Link href="/configuracoes"><Settings /> Configurações</Link></DropdownMenuItem></DropdownMenuGroup><DropdownMenuSeparator /><form action="/api/logout" method="post"><DropdownMenuItem asChild><button type="submit" className="w-full"><LogOut /> Sair</button></DropdownMenuItem></form></DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="mx-auto max-w-[1540px] px-4 pb-24 pt-6 sm:px-6 lg:pb-8 lg:pt-8">{children}</main>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-around rounded-2xl border border-white/10 bg-card/92 p-1.5 shadow-2xl backdrop-blur-xl lg:hidden">
        {primaryNavigation.slice(0, 4).map((item) => { const Icon = item.icon; return <Button key={item.href} asChild variant="ghost" size="icon"><Link href={item.href}><Icon /><span className="sr-only">{item.label}</span></Link></Button>; })}
      </nav>
    </div>
  );
}
