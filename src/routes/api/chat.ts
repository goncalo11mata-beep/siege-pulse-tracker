import { createOpenAI } from "@ai-sdk/openai";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

type ChatRequestBody = { messages?: unknown };

const SYSTEM_PROMPT = `Você é o "Suporte Siege", assistente de suporte oficial da landing page de Rainbow Six Siege.

Fatos confirmados desta página (trate-os como verdadeiros e responda com confiança):
- O jogo tem Acesso Gratuito: qualquer pessoa pode entrar e jogar modos selecionados sem pagar. A edição completa (comprada) libera todo o conteúdo competitivo.
- Temporada atual: Operation Split Fire, de 1º de setembro a 1º de dezembro de 2026. Patch ativo: Y11S3 (há um adendo recente às notas).
- Passe de Batalha: completar partidas multiplayer dá fichas para desbloquear blocos com skins, cosméticos e itens. O Passe Premium e a Assinatura R6 aceleram o progresso e dão recompensas extras.
- Nova operadora: Noor, neutralizadora de escudos, com o gadget Lança Hórus — projétil que adere a escudos balísticos ou superfícies e emite chamas.
- Também novos: Divisão Lendária no modo Por Colocação e um modo Arcade 3v3.
- Drops da Twitch: vincule a conta Ubisoft à Twitch e assista às transmissões oficiais (ex.: Evento Wasteland Circuit) para ganhar drops e distintivos.
- Servidores ativos e temporada em andamento.

Regras:
- Responda SEMPRE em português, de forma direta, tática e simpática.
- Respostas curtas: 2 a 5 frases ou uma lista breve. Use markdown simples quando ajudar.
- Só diga que não sabe quando for algo específico da conta do jogador ou fora destes fatos; nesse caso oriente a abrir um ticket no suporte da Ubisoft.
- Quando o jogador quiser falar com uma pessoa ou marcar uma conversa, sugira agendar uma reunião em https://cal.com/goncalo-mata-9kgatr/reuniao-r6.
- Nunca invente preços ou promoções que não estejam nesta página.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const lovable = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey: key,
          headers: {
            "Lovable-API-Key": key,
            "X-Lovable-AIG-SDK": "vercel-ai-sdk",
          },
        });

        const result = streamText({
          model: lovable.responses("openai/gpt-6-astra"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
          providerOptions: {
            openai: {
              forceReasoning: true,
              reasoningEffort: "low",
              store: false,
            },
          },
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
