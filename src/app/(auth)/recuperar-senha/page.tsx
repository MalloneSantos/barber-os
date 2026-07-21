import { RecoverForm } from "@/components/auth/auth-forms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecoverPage() {
  return <Card className="w-full max-w-md"><CardHeader><CardTitle className="font-heading text-2xl">Recuperar acesso</CardTitle><CardDescription>Simularemos o envio de um link seguro para seu e-mail.</CardDescription></CardHeader><CardContent><RecoverForm /></CardContent></Card>;
}
