import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  return <Card className="w-full max-w-lg"><CardHeader><CardTitle className="font-heading text-2xl">Crie seu ambiente</CardTitle><CardDescription>Comece com os dados essenciais. Você poderá completar tudo depois.</CardDescription></CardHeader><CardContent><form><FieldGroup><div className="grid gap-4 sm:grid-cols-2"><Field><FieldLabel htmlFor="name">Nome</FieldLabel><Input id="name" required /></Field><Field><FieldLabel htmlFor="lastName">Sobrenome</FieldLabel><Input id="lastName" required /></Field></div><Field><FieldLabel htmlFor="business">Nome da barbearia</FieldLabel><Input id="business" required /></Field><Field><FieldLabel htmlFor="signupEmail">E-mail</FieldLabel><Input id="signupEmail" type="email" required /></Field><Field orientation="horizontal"><Checkbox id="terms" required /><FieldLabel htmlFor="terms" className="font-normal">Aceito os termos e a política de privacidade.</FieldLabel></Field><Button type="submit">Criar ambiente de demonstração</Button></FieldGroup></form></CardContent></Card>;
}

