import { createFileRoute } from "@tanstack/react-router";
import { Activity, ArrowRight, CalendarDays, ChevronDown, ChevronRight, Clock, Flame, Radio, Shield, Trophy, Video } from "lucide-react";
import { useState } from "react";

import battlePassImage from "@/assets/r6-battle-pass-rewards.jpg";
import newsImage from "@/assets/r6-community-news.jpg";
import heroImage from "@/assets/r6-tactical-hero.jpg";
import splitFireImage from "@/assets/r6-split-fire-season.jpg";
import { SupportChat } from "@/components/SupportChat";
import { Button } from "@/components/ui/button";

const CAL_LINK = "https://cal.com/goncalo-mata-9kgatr/reuniao-r6";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rainbow Six Siege — A nova era começou" },
      {
        name: "description",
        content:
          "Jogue Rainbow Six Siege com acesso gratuito, explore a Operation Split Fire e acompanhe passe de batalha, drops e notas da atualização.",
      },
      { property: "og:title", content: "Rainbow Six Siege — A nova era começou" },
      {
        property: "og:description",
        content:
          "Acesse a temporada Operation Split Fire, desbloqueie recompensas e veja as últimas notícias de Rainbow Six Siege.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navItems = ["Membership", "Passe de Batalha", "Itens no jogo", "Créditos R6"];

const newsItems = [
  {
    tag: "Drops",
    title: "Novo Drop e distintivo da Twitch disponíveis durante o Evento Wasteland Circuit!",
    date: "19/9/2026",
  },
  {
    tag: "Atualização",
    title: "Y11S3 PATCH NOTES ADDENDUM",
    date: "16/9/2026",
  },
  {
    tag: "Operation Split Fire",
    title: "Novo Twitch Drop para a Operation Split Fire!",
    date: "9/9/2026",
  },
];

const stats = [
  ["3V3", "Novo modo Arcade"],
  ["Y11S3", "Patch ativo"],
  ["1º SET", "Temporada lançada"],
];

const faqItems = [
  {
    question: "O Rainbow Six Siege é gratuito?",
    answer:
      "Sim. Com o Acesso Gratuito você pode entrar agora e jogar modos selecionados sem pagar nada. Para desbloquear todo o conteúdo competitivo e o Passe de Batalha completo, é possível fazer upgrade para a edição completa.",
  },
  {
    question: "O que inclui o Passe de Batalha da Operation Split Fire?",
    answer:
      "O Passe de Batalha permite desbloquear recompensas ao completar partidas multiplayer, incluindo fichas, blocos, skins exclusivas e itens cosméticos. A versão Premium e a Assinatura R6 aceleram o progresso e adicionam recompensas extras.",
  },
  {
    question: "Quando termina a temporada Operation Split Fire?",
    answer:
      "A temporada vai de 1º de setembro a 1º de dezembro de 2026. Recompensas por tempo limitado só podem ser resgatadas durante esse período, então avance no passe antes do encerramento.",
  },
  {
    question: "Quem é a nova operadora Noor?",
    answer:
      "Noor é a nova operadora da Operation Split Fire, especializada em neutralizar escudos balísticos. Seu gadget Lança Hórus é um projétil que adere a escudos ou superfícies e emite chamas, forçando defensores a sair da posição.",
  },
  {
    question: "Como funcionam os Drops da Twitch?",
    answer:
      "Vincule sua conta Ubisoft à Twitch e assista às transmissões oficiais durante eventos como o Wasteland Circuit para ganhar drops exclusivos e distintivos diretamente no jogo.",
  },
  {
    question: "Onde encontro as notas da atualização Y11S3?",
    answer:
      "As notas completas do patch Y11S3 estão disponíveis na seção de notícias desta página, incluindo o adendo mais recente com ajustes de balanceamento e correções.",
  },
];

function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-siege-line bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <a href="#top" className="flex items-center gap-3 uppercase" aria-label="Rainbow Six Siege início">
            <span className="flex h-10 w-10 items-center justify-center border border-primary bg-secondary font-display text-lg font-bold text-primary">
              R6
            </span>
            <span className="hidden text-sm font-bold tracking-normal text-foreground sm:block">
              Rainbow Six Siege
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-semibold uppercase text-muted-foreground lg:flex">
            {navItems.map((item) => (
              <a key={item} href="#battle-pass" className="transition-colors hover:text-primary">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="intel" size="sm">
              <a href="#faq">FAQ</a>
            </Button>
            <Button asChild variant="intel" size="sm" className="hidden sm:inline-flex">
              <a href="#agendar">Agendar reunião</a>
            </Button>
            <Button asChild variant="tactical" size="sm">
              <a href="#status">Status do serviço</a>
            </Button>
            <Button asChild variant="breach" size="sm" className="hidden sm:inline-flex">
              <a href="#access">Acesso Gratuito</a>
            </Button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="relative isolate min-h-[94vh] overflow-hidden pt-16">
          <img
            src={heroImage}
            alt="Operadores táticos avançando em ambiente industrial"
            width={1920}
            height={1088}
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 [background:var(--gradient-hero-vignette)]" />
          <div className="absolute inset-0 -z-10 tactical-grid opacity-30" />
          <div className="mx-auto flex min-h-[calc(94vh-4rem)] max-w-7xl items-center px-4 py-16 md:px-8">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 border border-siege-line bg-siege-smoke px-4 py-2 text-sm font-bold uppercase text-primary">
                <Radio className="h-4 w-4" /> Operation Split Fire ativa
              </div>
              <h1 className="font-display text-6xl font-bold uppercase leading-none text-foreground md:text-8xl lg:text-9xl">
                A nova era de Rainbow Six Siege acaba de começar.
              </h1>
              <p className="mt-6 max-w-2xl text-xl font-medium uppercase text-muted-foreground md:text-2xl">
                Entre agora, teste sem risco e avance na temporada com recompensas por tempo limitado.
              </p>
              <div id="access" className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="breach" size="command">
                  <a href="#battle-pass">
                    Acesso Gratuito <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
                <Button asChild variant="tactical" size="command">
                  <a href="#buy">Comprar</a>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 border-y border-siege-line bg-siege-smoke backdrop-blur-md">
            <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-siege-line px-4 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-8">
              {stats.map(([value, label]) => (
                <div key={label} className="flex items-center justify-between py-4 md:px-5">
                  <span className="font-display text-3xl font-bold text-primary">{value}</span>
                  <span className="text-sm font-bold uppercase text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="battle-pass" className="section-gradient py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="flex flex-col justify-between border border-siege-line bg-card p-6 md:p-8">
              <div>
                <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase text-primary">
                  <CalendarDays className="h-4 w-4" /> De 1º de setembro a 1º de dezembro
                </p>
                <h2 className="font-display text-5xl font-bold uppercase leading-none md:text-7xl">
                  Passe de Batalha da Operation Split Fire
                </h2>
                <p className="mt-6 text-xl font-medium text-muted-foreground">
                  Complete partidas multiplayer para ganhar fichas do Passe de Batalha e desbloquear blocos.
                  Obtenha o Passe Premium ou a Assinatura para ganhar ainda mais recompensas.
                </p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Button asChild variant="breach" size="command">
                  <a href="#buy">Obter Passe Premium</a>
                </Button>
                <Button asChild variant="tactical" size="command">
                  <a href="#season">Saiba mais</a>
                </Button>
              </div>
            </div>
            <div className="relative min-h-[420px] overflow-hidden border border-siege-line scanline">
              <img
                src={battlePassImage}
                alt="Recompensas premium do Passe de Batalha"
                width={1200}
                height={800}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-siege-smoke p-5 backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-display text-3xl font-bold uppercase text-siege-gold">Recompensas desbloqueáveis</span>
                  <span className="text-sm font-bold uppercase text-muted-foreground">Fichas • Blocos • Skins</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase text-primary">
                  <Activity className="h-4 w-4" /> Comunidade ativa
                </p>
                <h2 className="font-display text-5xl font-bold uppercase leading-none md:text-7xl">Últimas notícias</h2>
              </div>
              <Button asChild variant="tactical" size="command">
                <a href="#news">Leia mais</a>
              </Button>
            </div>
            <div id="news" className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
              <article className="relative min-h-[520px] overflow-hidden border border-siege-line">
                <img
                  src={newsImage}
                  alt="Evento competitivo e transmissão da comunidade Rainbow Six Siege"
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-siege-smoke p-6 backdrop-blur-md md:p-8">
                  <p className="text-sm font-bold uppercase text-primary">Destaque</p>
                  <h3 className="mt-2 font-display text-4xl font-bold uppercase leading-none md:text-5xl">
                    Novo Drop e distintivo da Twitch disponíveis durante o Evento Wasteland Circuit!
                  </h3>
                </div>
              </article>
              <div className="grid gap-5">
                {newsItems.map((item) => (
                  <article key={item.title} className="group border border-siege-line bg-card p-6 transition-colors hover:border-primary">
                    <div className="flex items-center justify-between gap-4 text-sm font-bold uppercase text-muted-foreground">
                      <span className="text-primary">{item.tag}</span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="mt-5 font-display text-3xl font-bold uppercase leading-tight text-foreground md:text-4xl">
                      {item.title}
                    </h3>
                    <a href="#news" className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase text-primary">
                      Leia mais <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="season" className="section-gradient py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative overflow-hidden border border-siege-line breach-shadow">
              <img
                src={splitFireImage}
                alt="Noor usando o gadget Lança Hórus contra escudo balístico"
                width={1408}
                height={912}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div>
              <p className="mb-4 flex items-center gap-2 text-sm font-bold uppercase text-primary">
                <Flame className="h-4 w-4" /> Feature expansion
              </p>
              <h2 className="font-display text-5xl font-bold uppercase leading-none md:text-7xl">Operation Split Fire</h2>
              <p className="mt-6 text-xl font-medium text-muted-foreground">
                A Operation Split Fire traz grandes atualizações de conteúdo, incluindo Noor, um novo agente neutralizador de escudo com o gadget Lança Hórus: projétil que adere a escudos balísticos ou superfícies e emite chamas.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="border border-siege-line bg-card p-5">
                  <Shield className="mb-4 h-7 w-7 text-primary" />
                  <h3 className="font-display text-2xl font-bold uppercase">Noor</h3>
                  <p className="mt-2 text-base font-medium text-muted-foreground">Novo operador contra escudos balísticos.</p>
                </div>
                <div className="border border-siege-line bg-card p-5">
                  <Trophy className="mb-4 h-7 w-7 text-primary" />
                  <h3 className="font-display text-2xl font-bold uppercase">Divisão Lendária</h3>
                  <p className="mt-2 text-base font-medium text-muted-foreground">Competição renovada em Por Colocação.</p>
                </div>
              </div>
              <Button asChild variant="tactical" size="command" className="mt-8">
                <a href="#patch-notes">Ver Notas da Atualização</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="faq" className="border-t border-siege-line bg-background py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-4 md:px-8">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase text-primary">
              <Shield className="h-4 w-4" /> Central de inteligência
            </p>
            <h2 className="font-display text-5xl font-bold uppercase leading-none md:text-7xl">
              Perguntas frequentes
            </h2>
            <div className="mt-10 divide-y divide-siege-line border border-siege-line bg-card">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={item.question}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-secondary md:p-6"
                    >
                      <span className="font-display text-xl font-bold uppercase text-foreground md:text-2xl">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`h-6 w-6 shrink-0 text-primary transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="border-t border-siege-line px-5 pb-6 pt-4 text-lg font-medium text-muted-foreground md:px-6">
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="buy" className="border-t border-siege-line bg-background py-16">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 md:flex-row md:items-center md:px-8">
            <div>
              <p id="status" className="text-sm font-bold uppercase text-primary">Servidores ativos • Temporada em andamento</p>
              <h2 className="mt-2 font-display text-4xl font-bold uppercase leading-none md:text-6xl">Prepare-se para entrar.</h2>
            </div>
            <div className="grid w-full gap-3 sm:grid-cols-2 md:w-auto">
              <Button asChild variant="breach" size="command">
                <a href="#top">Acesso Gratuito</a>
              </Button>
              <Button asChild variant="intel" size="command">
                <a id="patch-notes" href="#season">Ver Notas da Atualização</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="agendar" className="section-gradient border-t border-siege-line py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid gap-8 border border-siege-line bg-card p-6 md:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase text-primary">
                  <Video className="h-4 w-4" /> Briefing individual
                </p>
                <h2 className="font-display text-5xl font-bold uppercase leading-none md:text-7xl">
                  Agende uma reunião com a equipa
                </h2>
                <p className="mt-6 text-xl font-medium text-muted-foreground">
                  Quer falar com uma pessoa real sobre edições, Passe de Batalha, conta ou parcerias?
                  Escolha um horário no calendário e receba o convite por e-mail.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 border border-siege-line bg-secondary p-4">
                    <Clock className="h-6 w-6 shrink-0 text-primary" />
                    <span className="text-base font-bold uppercase text-foreground">30 minutos, online</span>
                  </div>
                  <div className="flex items-center gap-3 border border-siege-line bg-secondary p-4">
                    <CalendarDays className="h-6 w-6 shrink-0 text-primary" />
                    <span className="text-base font-bold uppercase text-foreground">Horário à sua escolha</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 border border-siege-line bg-siege-smoke p-6">
                <p className="font-display text-3xl font-bold uppercase leading-none text-siege-gold">
                  Reunião R6
                </p>
                <p className="text-base font-medium text-muted-foreground">
                  Marcação feita no Cal.com, sem registo necessário.
                </p>
                <Button asChild variant="breach" size="command" className="mt-2">
                  <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
                    Agendar reunião <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
                <Button asChild variant="tactical" size="sm">
                  <a href="#faq">Antes disso, ver as perguntas frequentes</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SupportChat />
    </div>
  );
}
