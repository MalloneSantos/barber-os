import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function RecoverPage() {
  return <Card className="w-full max-w-md"><CardHeader><CardTitle className="font-heading text-2xl">Recuperar acesso</CardTitle><CardDescription>Simularemos o envio de um link seguro para seu e-mail.</CardDescription></CardHeader><CardContent><form><FieldGroup><Field><FieldLabel htmlFor="email">E-mail</FieldLabel><Input id="email" type="email" placeholder="voce@barbearia.com" required /></Field><Button type="submit">Enviar link simulado</Button></FieldGroup></form></CardContent></Card>;
}

