import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireSession } from "@/server/auth/authorization";

export default async function ProfilePage() {
  const session = await requireSession();
  return <div className="mx-auto max-w-2xl"><Card><CardHeader><CardTitle className="font-heading text-2xl">Meu perfil</CardTitle></CardHeader><CardContent className="grid gap-4"><div><p className="text-xs text-muted-foreground">Nome</p><p className="font-medium">{session.name}</p></div><div><p className="text-xs text-muted-foreground">E-mail</p><p className="font-medium">{session.email}</p></div><div><p className="text-xs text-muted-foreground">Empresa ativa</p><p className="font-medium">{session.tenantName}</p></div><div><p className="text-xs text-muted-foreground">Papel</p><Badge>{session.role}</Badge></div><p className="text-xs text-muted-foreground">O MVP mantém uma empresa ativa por sessão. Alternância de memberships permanece fora do escopo.</p></CardContent></Card></div>;
}
