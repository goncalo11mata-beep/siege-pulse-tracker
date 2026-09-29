import { useState } from "react";
import { Check, FileText, Send } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const MAX_PEDIDO = 1200;

const proposalSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, { message: "Indique o seu nome (mínimo 2 caracteres)." })
    .max(80, { message: "O nome deve ter no máximo 80 caracteres." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Indique um email para receber a resposta." })
    .email({ message: "Email inválido. Exemplo: nome@dominio.com" })
    .max(255, { message: "O email deve ter no máximo 255 caracteres." }),
  pedido: z
    .string()
    .trim()
    .min(15, { message: "Descreva o seu pedido com pelo menos 15 caracteres." })
    .max(MAX_PEDIDO, { message: `O pedido deve ter no máximo ${MAX_PEDIDO} caracteres.` }),
});

type Values = z.infer<typeof proposalSchema>;
type FieldName = keyof Values;
type Errors = Partial<Record<FieldName, string>>;

const emptyValues: Values = { nome: "", email: "", pedido: "" };

export function ProposalForm() {
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<Values | null>(null);

  const updateField = (field: FieldName) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const nextValue = event.target.value;
    setValues((current) => ({ ...current, [field]: nextValue }));
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = proposalSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: Errors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !nextErrors[field as FieldName]) {
          nextErrors[field as FieldName] = issue.message;
        }
      }
      setErrors(nextErrors);
      setSent(null);
      return;
    }

    setErrors({});
    setSent(result.data);
    setValues(emptyValues);
  };

  return (
    <section id="proposta" className="section-gradient border-t border-siege-line py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-8 border border-siege-line bg-card p-6 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase text-primary">
              <FileText className="h-4 w-4" /> Fale connosco
            </p>
            <h2 className="font-display text-5xl font-bold uppercase leading-none md:text-7xl">
              Pedido de proposta
            </h2>
            <p className="mt-6 text-xl font-medium text-muted-foreground">
              Diga quem é, como o podemos contactar e o que pretende. A equipa analisa o pedido e
              envia uma proposta à medida.
            </p>
            <ul className="mt-8 space-y-3 text-base font-medium text-muted-foreground">
              <li className="flex items-start gap-3 border border-siege-line bg-secondary p-4">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>Resposta da equipa em horário útil</span>
              </li>
              <li className="flex items-start gap-3 border border-siege-line bg-secondary p-4">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>Proposta ajustada ao seu pedido, sem compromisso</span>
              </li>
            </ul>
          </div>

          {sent ? (
            <div
              className="border border-siege-line bg-siege-smoke p-6 md:p-8"
              role="status"
              aria-live="polite"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center border border-primary bg-secondary text-primary">
                  <Check className="h-6 w-6" />
                </span>
                <p className="font-display text-3xl font-bold uppercase leading-none text-siege-gold">
                  Pedido enviado
                </p>
              </div>
              <p className="text-lg font-medium text-muted-foreground">
                Obrigado, {sent.nome}. Vamos responder para {sent.email}.
              </p>
              <p className="mt-4 border-l-2 border-primary bg-secondary p-4 text-base font-medium text-foreground">
                {sent.pedido}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="tactical" size="command">
                  <a href="#agendar">Agendar reunião</a>
                </Button>
                <Button variant="breach" size="command" onClick={() => setSent(null)}>
                  Enviar novo pedido
                </Button>
              </div>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={handleSubmit}
              className="grid gap-6 border border-siege-line bg-siege-smoke p-6 md:p-8"
            >
              <div className="grid gap-2">
                <Label htmlFor="proposta-nome" className="text-sm font-bold uppercase text-foreground">
                  Nome
                </Label>
                <Input
                  id="proposta-nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  maxLength={80}
                  placeholder="O seu nome"
                  value={values.nome}
                  onChange={updateField("nome")}
                  aria-invalid={errors.nome ? true : undefined}
                  aria-describedby={errors.nome ? "proposta-nome-error" : undefined}
                  className={cn("h-11", errors.nome && "border-destructive focus-visible:ring-destructive")}
                />
                {errors.nome && (
                  <p id="proposta-nome-error" className="text-sm font-bold uppercase text-destructive">
                    {errors.nome}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="proposta-email" className="text-sm font-bold uppercase text-foreground">
                  Email
                </Label>
                <Input
                  id="proposta-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={255}
                  placeholder="nome@dominio.com"
                  value={values.email}
                  onChange={updateField("email")}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? "proposta-email-error" : undefined}
                  className={cn("h-11", errors.email && "border-destructive focus-visible:ring-destructive")}
                />
                {errors.email && (
                  <p id="proposta-email-error" className="text-sm font-bold uppercase text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="proposta-pedido" className="text-sm font-bold uppercase text-foreground">
                  Pedido
                </Label>
                <Textarea
                  id="proposta-pedido"
                  name="pedido"
                  rows={6}
                  maxLength={MAX_PEDIDO}
                  placeholder="Descreva o que pretende: edições, Passe de Batalha, conta, parcerias..."
                  value={values.pedido}
                  onChange={updateField("pedido")}
                  aria-invalid={errors.pedido ? true : undefined}
                  aria-describedby={errors.pedido ? "proposta-pedido-error" : "proposta-pedido-hint"}
                  className={cn("text-base", errors.pedido && "border-destructive focus-visible:ring-destructive")}
                />
                <div className="flex items-center justify-between gap-4">
                  {errors.pedido ? (
                    <p id="proposta-pedido-error" className="text-sm font-bold uppercase text-destructive">
                      {errors.pedido}
                    </p>
                  ) : (
                    <p id="proposta-pedido-hint" className="text-sm font-medium text-muted-foreground">
                      Quanto mais detalhes, mais precisa é a proposta.
                    </p>
                  )}
                  <span className="shrink-0 text-sm font-bold uppercase text-muted-foreground">
                    {values.pedido.length}/{MAX_PEDIDO}
                  </span>
                </div>
              </div>

              <Button type="submit" variant="breach" size="command" className="w-full">
                Enviar pedido <Send className="h-5 w-5" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
