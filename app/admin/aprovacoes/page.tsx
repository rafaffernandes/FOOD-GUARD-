import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { fetchPendingDrafts } from "@/lib/agent/store";
import { approveDraft, rejectDraft } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Aprovações — Food Guard",
  robots: { index: false, follow: false },
};

export default async function AprovacoesPage() {
  const drafts = await fetchPendingDrafts();

  return (
    <main className="min-h-screen bg-surface-soft py-12">
      <Container>
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            Painel interno
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
            Fila de aprovação
          </h1>
          <p className="mt-2 text-ink-soft">
            {drafts.length} rascunho(s) aguardando revisão. Nada é enviado ou
            publicado sem a sua aprovação.
          </p>
        </header>

        {drafts.length === 0 ? (
          <Card>
            <p className="text-ink-soft">
              Nenhum rascunho pendente. Quando os agentes rodarem, os rascunhos
              aparecem aqui para revisão.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {drafts.map((d) => (
              <Card key={`${d.table}:${d.id}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{d.kind}</Badge>
                  {d.channel ? <Badge tone="neutral">{d.channel}</Badge> : null}
                  <Badge tone={d.aiGenerated ? "brand" : "warn"}>
                    {d.aiGenerated ? "IA" : "fallback"}
                  </Badge>
                </div>

                <h2 className="mt-3 font-display text-lg font-bold text-ink">
                  {d.title}
                </h2>
                {d.subtitle ? (
                  <p className="text-sm text-ink-muted">{d.subtitle}</p>
                ) : null}

                <p className="mt-3 whitespace-pre-wrap rounded-xl bg-surface-sunken/60 p-4 text-sm text-ink-soft">
                  {d.message}
                </p>

                {d.rationale ? (
                  <p className="mt-2 text-xs text-ink-muted">
                    <span className="font-semibold">Por quê:</span> {d.rationale}
                  </p>
                ) : null}

                <div className="mt-4 flex gap-3">
                  <form action={approveDraft}>
                    <input type="hidden" name="table" value={d.table} />
                    <input type="hidden" name="id" value={d.id} />
                    <Button type="submit" size="sm">
                      Aprovar
                    </Button>
                  </form>
                  <form action={rejectDraft}>
                    <input type="hidden" name="table" value={d.table} />
                    <input type="hidden" name="id" value={d.id} />
                    <Button type="submit" size="sm" variant="outline">
                      Rejeitar
                    </Button>
                  </form>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
