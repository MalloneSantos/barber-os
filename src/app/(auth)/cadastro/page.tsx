import { SignupForm } from "@/components/auth/auth-forms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  return <Card className="w-full max-w-lg"><CardHeader><CardTitle className="font-heading text-2xl">Crie seu ambiente</CardTitle><CardDescription>Comece com os dados essenciais. Você poderá completar tudo depois.</CardDescription></CardHeader><CardContent><SignupForm /></CardContent></Card>;
}
