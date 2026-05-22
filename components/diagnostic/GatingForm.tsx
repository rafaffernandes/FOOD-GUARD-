"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .min(10, "Telefone inválido")
    .regex(/[0-9()\s-]+/, "Telefone inválido"),
  company: z.string().min(2, "Informe o nome da empresa"),
  role: z.enum(["Dono", "CEO", "Diretor", "Gerente", "Outro"], {
    errorMap: () => ({ message: "Selecione seu cargo" }),
  }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "É necessário aceitar para continuar" }),
  }),
  whatsappOptin: z.boolean().optional(),
});

export type GatingValues = z.infer<typeof schema>;

const roles = ["Dono", "CEO", "Diretor", "Gerente", "Outro"] as const;

export function GatingForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (values: GatingValues) => void;
  submitting: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GatingValues>({
    resolver: zodResolver(schema),
    defaultValues: { whatsappOptin: true },
  });

  const fieldClass =
    "w-full rounded-xl border border-surface-sunken bg-surface-soft px-4 py-3 text-ink outline-none transition focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome completo" error={errors.name?.message}>
          <input className={fieldClass} placeholder="Seu nome" {...register("name")} />
        </Field>
        <Field label="E-mail" error={errors.email?.message}>
          <input
            type="email"
            className={fieldClass}
            placeholder="voce@empresa.com.br"
            {...register("email")}
          />
        </Field>
        <Field label="Telefone / WhatsApp" error={errors.phone?.message}>
          <input
            className={fieldClass}
            placeholder="(11) 99999-9999"
            {...register("phone")}
          />
        </Field>
        <Field label="Empresa" error={errors.company?.message}>
          <input
            className={fieldClass}
            placeholder="Nome do estabelecimento"
            {...register("company")}
          />
        </Field>
      </div>

      <Field label="Seu cargo" error={errors.role?.message}>
        <select className={fieldClass} defaultValue="" {...register("role")}>
          <option value="" disabled>
            Selecione…
          </option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </Field>

      <label className="flex items-start gap-3 text-sm text-ink-soft">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-surface-sunken text-brand-600 focus:ring-brand-400"
          {...register("consent")}
        />
        <span>
          Concordo com o tratamento dos meus dados para gerar o diagnóstico,
          conforme a{" "}
          <a href="/contato" className="text-brand-700 underline">
            Política de Privacidade (LGPD)
          </a>
          .
        </span>
      </label>
      {errors.consent?.message && (
        <p className="text-sm text-danger-600">{errors.consent.message}</p>
      )}

      <label className="flex items-start gap-3 text-sm text-ink-soft">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-surface-sunken text-brand-600 focus:ring-brand-400"
          {...register("whatsappOptin")}
        />
        <span>
          Aceito receber meu relatório e o contato do RT pelo WhatsApp
          (opcional).
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className={cn(
          "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-soft transition hover:bg-brand-700 hover:shadow-lift disabled:opacity-60",
        )}
      >
        {submitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Lock className="h-5 w-5" />
        )}
        Destravar meu diagnóstico completo
      </button>
      <p className="text-center text-xs text-ink-muted">
        Resultado na tela + relatório no seu e-mail. Sem spam.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      {children}
      {error && <p className="mt-1 text-sm text-danger-600">{error}</p>}
    </div>
  );
}
