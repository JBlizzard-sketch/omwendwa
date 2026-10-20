import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { RotateCcw } from "lucide-react";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import portrait from "@/assets/rachel-mwendwa.jpg";
export default function LegalAssistant() {
  const input = useRef<HTMLTextAreaElement>(null);
  const transport = useMemo(() => new DefaultChatTransport({ api: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/legal-assistant`, headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } }), []);
  const { messages, sendMessage, status, error, stop, setMessages, clearError } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";
  useEffect(() => { if (!busy) input.current?.focus(); }, [busy]);
  return <section className="container mx-auto max-w-4xl px-5 pt-28 pb-16">
    <SEOHead title="Kenyan-law assistant" description="Ask questions about Kenyan law with explanations linked to published O. Mwendwa & Company Advocates articles." canonical="https://omwendwa.com/legal-assistant" />
    <div className="flex items-start justify-between gap-4 border-b pb-6 mb-5"><div className="flex items-center gap-4"><img src={portrait} alt="Rachel Mwendwa" className="h-16 w-16 rounded-full object-cover shrink-0" /><div><p className="text-xs font-semibold text-primary mb-2">O. MWENDWA & COMPANY ADVOCATES</p><h1 className="font-heading text-3xl">Kenyan-law assistant</h1></div></div><Button variant="outline" size="icon" title="New conversation" aria-label="New conversation" disabled={busy} onClick={() => { setMessages([]); clearError(); input.current?.focus(); }}><RotateCcw /></Button></div>
    <p className="text-sm text-muted-foreground mb-6">AI-generated general information, not legal advice. Articles may not reflect later legal changes. No advocate–client relationship is created. Do not share names, confidential documents or sensitive case details. Questions are not saved by the firm.</p>
    <Conversation className="h-[480px] min-h-0 border-b mb-5"><ConversationContent className="px-0">
      {!messages.length && <div className="py-10"><h2 className="font-heading text-2xl mb-4">What would you like to understand?</h2><div className="flex flex-wrap gap-3">{["What should I check before buying land in Kenya?", "How can a business prepare for data protection compliance?", "What does the firm say about recovering a debt?"].map(q => <Button key={q} variant="outline" className="h-auto whitespace-normal text-left justify-start py-3" onClick={() => void sendMessage({ text: q })}>{q}</Button>)}</div></div>}
      {messages.map(m => <Message from={m.role} key={m.id}><MessageContent className={m.role === "user" ? "bg-primary text-primary-foreground" : "bg-transparent"}>{m.parts.map((p, i) => p.type === "text" ? <MessageResponse key={i}>{p.text}</MessageResponse> : p.type === "reasoning" ? <details key={i} className="text-xs text-muted-foreground"><summary className="cursor-pointer">Reasoning</summary><MessageResponse>{p.text}</MessageResponse></details> : null)}</MessageContent></Message>)}
      {status === "submitted" && <Shimmer>Reading the firm's articles…</Shimmer>}
      {error && <p role="alert" className="text-destructive text-sm">{error.message}</p>}
    </ConversationContent><ConversationScrollButton /></Conversation>
    <PromptInput onSubmit={async ({ text }) => { if (!text.trim() || busy) return; clearError(); void sendMessage({ text }); input.current?.focus(); }}><PromptInputTextarea ref={input} aria-label="Your Kenyan-law question" placeholder="Ask a Kenyan-law question…" maxLength={4000} autoFocus disabled={busy} className="min-h-24" /><PromptInputFooter className="justify-end"><PromptInputSubmit status={status} onStop={stop} /></PromptInputFooter></PromptInput>
    <p className="mt-5 text-sm text-muted-foreground">For advice on your circumstances, <Link to="/consultation" className="text-primary underline">request a consultation</Link>. <Link to="/privacy-notice" className="text-primary underline">Privacy notice</Link></p>
  </section>;
}