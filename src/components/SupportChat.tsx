import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { CalendarDays, Headset, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";

const CAL_LINK = "https://cal.com/goncalo-mata-9kgatr/reuniao-r6";

const suggestions = [
  "O jogo é realmente gratuito?",
  "Como avanço no Passe de Batalha?",
  "Quem é a operadora Noor?",
];

export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open && !isLoading) textareaRef.current?.focus();
  }, [open, isLoading]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || isLoading) return;
    void sendMessage({ text: value });
    setInput("");
  };

  return (
    <>
      {!open && (
        <Button
          type="button"
          variant="breach"
          onClick={() => setOpen(true)}
          aria-label="Abrir suporte ao jogador"
          className="fixed bottom-5 right-5 z-[60] h-14 gap-2 px-5 text-sm font-bold uppercase shadow-[var(--shadow-breach)]"
        >
          <Headset className="h-5 w-5" />
          <span className="hidden sm:inline">Suporte</span>
        </Button>
      )}

      {open && (
        <div className="fixed bottom-0 right-0 z-[60] flex h-[min(80vh,620px)] w-full flex-col border border-siege-line bg-background shadow-[var(--shadow-breach)] sm:bottom-5 sm:right-5 sm:w-[400px]">
          <div className="flex items-center justify-between gap-3 border-b border-siege-line bg-siege-smoke px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center border border-primary bg-secondary font-display text-sm font-bold text-primary">
                R6
              </span>
              <div>
                <p className="font-display text-base font-bold uppercase leading-none text-foreground">
                  Suporte Siege
                </p>
                <p className="text-xs font-bold uppercase text-primary">Online agora</p>
              </div>
            </div>
            <Button
              type="button"
              variant="tactical"
              size="icon"
              aria-label="Fechar suporte"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Conversation className="flex-1">
            <ConversationContent className="gap-4">
              {messages.length === 0 ? (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Pergunte o que quiser sobre Rainbow Six Siege: acesso gratuito, Passe de Batalha,
                    a temporada Split Fire, Drops da Twitch ou problemas técnicos.
                  </p>
                  <div className="flex flex-col gap-2">
                    {suggestions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => send(item)}
                        className="border border-siege-line bg-secondary px-3 py-2 text-left text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => {
                  const text = message.parts
                    .map((part) => (part.type === "text" ? part.text : ""))
                    .join("");
                  if (!text) return null;
                  return (
                    <Message from={message.role} key={message.id}>
                      <MessageContent>
                        <MessageResponse>{text}</MessageResponse>
                      </MessageContent>
                    </Message>
                  );
                })
              )}
              {status === "submitted" && <Shimmer>Analisando...</Shimmer>}
              {error && (
                <p className="text-sm font-semibold text-destructive">
                  Não foi possível responder agora. Tente novamente em instantes.
                </p>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="border-t border-siege-line p-3">
            <PromptInput
              onSubmit={(message) => {
                send(message.text ?? input);
              }}
            >
              <PromptInputTextarea
                ref={textareaRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Escreva sua dúvida sobre o jogo..."
              />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit status={status} disabled={!input.trim() || isLoading} />
              </PromptInputFooter>
            </PromptInput>
            <Button asChild variant="intel" size="sm" className="mt-3 w-full gap-2">
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
                <CalendarDays className="h-4 w-4" /> Agendar reunião
              </a>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
