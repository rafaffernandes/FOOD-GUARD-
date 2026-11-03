"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(120, "Use até 120 caracteres"),
  email: z.string().trim().email("E-mail inválido").max(254, "E-mail inválido"),
  phone: z
    .string()
    .trim()
    .min(10, "Telefone inválido")
    .regex(/^[0-9()+\s.xX–-]{8,25}$/, "Telefone inválido"),
  company: z
    .string()
    .trim()
    .min(2, "Informe o nome da empresa")
    .max(160, "Use até 160 caracteres"),
  role: z.enum(["Diretor", "Gestor", "Gerente", "Supervisor", "Outro"], {
    errorMap: () => ({ message: "Selecione seu cargo" }),
  }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "É necessário aceitar para continuar" }),
  }),
  whatsappOptin: z.boolean().optional(),
  // Campo isca: invisível para quem preenche, mas robô costuma preencher.
  website: z.string().optional(),
});

/** fillMs: tempo de preenchimento medido no navegador; o servidor descarta envio rápido demais. */
export type GatingValues = z.infer<typeof schema> & { fillMs?: number };

const roles = ["Diretor", "Gestor", "Gerente", "Supervisor", "Outro"] as const;

/**
 * Formulário de captura. Nasceu no diagnóstico e hoje serve também o
 * checklist, por isso os textos são parametrizáveis — os padrões mantêm
 * exatamente a redação do diagnóstico, que continua chamando sem props.
 */
export function GatingForm({
  onSubmit,
  submitting,
  ctaLabel = "Liberar meu relatório e ver o dinheiro em risco",
  consentPurpose = "gerar o diagnóstico",
  optinLabel = "Aceito receber meu relatório e o contato do nutricionista pelo WhatsApp (opcional).",
  footnote = "Resultado na tela + relatório no seu e-mail. Sem spam.",
}: {
  onSubmit: (values: GatingValues) => void;
  submitting: boolean;
  ctaLabel?: string;
  consentPurpose?: string;
  optinLabel?: string;
  footnote?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { whatsappOptin: true },
  });

  const inicio = useRef(Date.now());

  const fieldClass =
    "w-full rounded-xl border border-surface-sunken bg-surface-soft px-4 py-3 text-ink outline-none transition focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100";

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit({ ...values, fillMs: Date.now() - inicio.current }))}
      className="space-y-4"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome completo" error={errors.name?.message}>
          <input className={fieldClass} placeholder="Seu nome" maxLength={120} {...register("name")} />
        </Field>
        <Field label="E-mail" error={errors.email?.message}>
          <input
            type="email"
            className={fieldClass}
            placeholder="voce@empresa.com.br"
            maxLength={254}
            {...register("email")}
          />
        </Field>
        <Field label="Telefone / WhatsApp" error={errors.phone?.message}>
          <input
            className={fieldClass}
            placeholder="(11) 99999-9999"
            maxLength={30}
            {...register("phone")}
          />
        </Field>
        <Field label="Empresa" error={errors.company?.message}>
          <input
            className={fieldClass}
            placeholder="Nome do estabelecimento"
            maxLength={160}
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
          Concordo com o tratamento dos meus dados para {consentPurpose},
          conforme a{" "}
          <a href="/privacidade" className="text-brand-700 underline">
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
        <span>{optinLabel}</span>
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
        {ctaLabel}
      </button>
      <p className="text-center text-xs text-ink-muted">{footnote}</p>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Site
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            data-1p-ignore="true"
            data-lpignore="true"
            data-bwignore="true"
            data-form-type="other"
            {...register("website")}
          />
        </label>
      </div>
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
