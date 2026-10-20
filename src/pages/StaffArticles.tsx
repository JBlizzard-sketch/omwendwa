import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowLeft, Plus, Save, History, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useStaff } from "@/hooks/use-staff";
import { articleStatuses, canEditArticles, canPublishArticles, validArticleSlug } from "@/lib/editorialRules";
import { blogCategories, blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SEOHead from "@/components/SEOHead";
import ReactMarkdown from "react-markdown";
type Article = Tables<"editorial_articles">;
const empty = { slug: "", title: "", excerpt: "", category: "Legal Guides", content: "", meta_description: "", author_name: "Rachel Mwendwa", review_notes: "", status: "draft", publish_at: "" };
type Form = typeof empty;
const formFrom = (row: Article): Form => ({ slug: row.slug, title: row.title, excerpt: row.excerpt, category: row.category, content: row.content, meta_description: row.meta_description, author_name: row.author_name, review_notes: row.review_notes, status: row.status, publish_at: row.publish_at ? new Date(new Date(row.publish_at).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : "" });
export default function StaffArticles() {
  const staff = useStaff();
  const allowed = canEditArticles(staff.roles);
  const admin = canPublishArticles(staff.roles);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selected, setSelected] = useState<Article | null>(null);
  const [form, setForm] = useState<Form>(empty);
  const [revisions, setRevisions] = useState<Tables<"article_revisions">[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [filter, setFilter] = useState("all");
  const [preview, setPreview] = useState(false);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    if (!allowed || !staff.user) return;
    let active = true;
    void supabase.from("editorial_articles").select("*").order("updated_at", { ascending: false }).then(result => { if (!active) return; if (result.error) setError(result.error.message); else setArticles(result.data ?? []); });
    return () => { active = false; };
  }, [allowed, staff.user?.id, refresh]);
  useEffect(() => {
    if (!selected || !allowed) { setRevisions([]); return; }
    let active = true;
    void supabase.from("article_revisions").select("*").eq("article_id", selected.id).order("version", { ascending: false }).then(result => { if (!active) return; if (result.error) setError(result.error.message); else setRevisions(result.data ?? []); });
    return () => { active = false; };
  }, [selected?.id, selected?.version, allowed]);
  const choose = (row: Article | null) => { setSelected(row); setForm(row ? formFrom(row) : empty); setError(""); setNotice(""); };
  const save = async () => {
    if (!validArticleSlug(form.slug)) { setError("Use a lowercase article address with hyphens."); return; }
    if (!selected && blogPosts.some(p => p.slug === form.slug) && !form.content) { setError("Select the existing article to edit it."); return; }
    setBusy(true); setError(""); setNotice("");
    const payload = { ...form, publish_at: form.publish_at ? new Date(form.publish_at).toISOString() : null };
    try {
      const result = selected ? await supabase.from("editorial_articles").update(payload).eq("id", selected.id).eq("version", selected.version).select("*").maybeSingle() : await supabase.from("editorial_articles").insert(payload).select("*").single();
      if (result.error) throw result.error;
      if (!result.data) throw new Error("This article changed since you opened it. Refresh before saving.");
      choose(result.data); setNotice("Saved. Public content changes only when an approved article is published."); setRefresh(r => r + 1);
    } catch (e) { setError(e instanceof Error ? e.message : "Article could not be saved."); }
    finally { setBusy(false); }
  };
  const restore = (snapshot: Tables<"article_revisions">["snapshot"]) => {
    if (!snapshot || typeof snapshot !== "object" || Array.isArray(snapshot)) return;
    setForm(current => ({ ...current, title: String(snapshot.title ?? ""), excerpt: String(snapshot.excerpt ?? ""), content: String(snapshot.content ?? ""), meta_description: String(snapshot.meta_description ?? ""), author_name: String(snapshot.author_name ?? "Rachel Mwendwa"), status: "draft" }));
    setNotice("Revision restored to the working copy. Save as a draft before review.");
  };
  if (staff.loading) return <p role="status" className="p-20">Checking staff access…</p>;
  if (!staff.user) return <Navigate to="/staff/login" replace />;
  if (!allowed) return <section className="container py-28"><SEOHead title="Article access" description="Private editorial workspace." noindex /><h1 className="text-3xl mb-4">Article access not assigned</h1><Link to="/staff" className="text-primary underline">Back to firm workspace</Link></section>;
  return <section className="container mx-auto px-5 pt-28 pb-20">
    <SEOHead title="Article publishing" description="Private article drafting and review." noindex />
    <Link to="/staff" className="inline-flex gap-2 text-primary mb-6"><ArrowLeft className="w-4" />Firm workspace</Link>
    <div className="flex flex-wrap justify-between gap-4 mb-8"><div><h1 className="text-4xl font-heading">Article publishing</h1><p className="text-muted-foreground mt-2">Drafts · Review · Publication · History</p></div><Button onClick={() => choose(null)}><Plus />New article</Button></div>
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="min-w-0"><Label htmlFor="article-filter">Status</Label><select id="article-filter" className="w-full rounded-md border bg-background p-2 mb-5" value={filter} onChange={e => setFilter(e.target.value)}><option value="all">All articles</option>{articleStatuses.map(s => <option key={s}>{s}</option>)}</select>
        <div className="space-y-2">{articles.filter(a => filter === "all" || a.status === filter).map(a => <Button key={a.id} variant={selected?.id === a.id ? "secondary" : "ghost"} className="w-full h-auto whitespace-normal text-left justify-start py-3" onClick={() => choose(a)}><span><span className="block">{a.title || a.slug}</span><span className="text-xs text-muted-foreground">{a.status} · v{a.version}</span></span></Button>)}</div>
        <details className="mt-8"><summary className="cursor-pointer text-sm text-primary">Existing firm articles</summary>{blogPosts.filter(p => !articles.some(a => a.slug === p.slug)).map(p => <Button key={p.slug} variant="ghost" className="h-auto w-full whitespace-normal justify-start text-left my-2" onClick={() => { choose(null); setForm({ ...empty, slug: p.slug, title: p.title, content: p.content, excerpt: p.excerpt, category: p.category, meta_description: p.metaDescription }); }}>{p.title}</Button>)}</details>
      </aside>
      <div className="min-w-0"><form onSubmit={e => { e.preventDefault(); void save(); }} className="space-y-5">
        {error && <p role="alert" className="text-destructive">{error}</p>}{notice && <p role="status" className="text-primary">{notice}</p>}
        <div className="grid sm:grid-cols-2 gap-4">{(["title", "slug", "author_name", "meta_description"] as const).map(key => <div key={key}><Label htmlFor={`article-${key}`}>{({ title: "Title", slug: "Permanent article address", author_name: "Author", meta_description: "Search description" })[key]}</Label><Input id={`article-${key}`} value={form[key]} disabled={key === "slug" && !!selected} required maxLength={key === "slug" ? 160 : 300} onChange={e => setForm({ ...form, [key]: e.target.value })} /></div>)}</div>
        <div><Label htmlFor="article-category">Category</Label><select id="article-category" className="w-full border rounded-md bg-background p-2" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>{blogCategories.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}</select></div>
        <div><Label htmlFor="article-excerpt">Summary</Label><Textarea id="article-excerpt" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} maxLength={2000} required /></div>
        <div className="flex justify-between items-center"><Label htmlFor="article-content">Article</Label><Button type="button" variant="outline" size="sm" onClick={() => setPreview(p => !p)}>{preview ? "Edit" : "Preview"}</Button></div>
        {preview ? <div className="prose max-w-none border-y py-6"><ReactMarkdown>{form.content}</ReactMarkdown></div> : <Textarea id="article-content" className="min-h-[360px]" value={form.content} maxLength={100000} onChange={e => setForm({ ...form, content: e.target.value })} required />}
        <div><Label htmlFor="article-notes">Private review notes</Label><Textarea id="article-notes" value={form.review_notes} maxLength={10000} onChange={e => setForm({ ...form, review_notes: e.target.value })} /></div>
        <div className="grid sm:grid-cols-2 gap-4"><div><Label htmlFor="article-status">Save as</Label><select id="article-status" className="w-full border rounded-md bg-background p-2" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>{(admin ? articleStatuses : ["draft", "review"]).map(s => <option key={s}>{s}</option>)}</select></div>{admin && <div><Label htmlFor="article-schedule">Publication time (your local time)</Label><Input id="article-schedule" type="datetime-local" value={form.publish_at} onChange={e => setForm({ ...form, publish_at: e.target.value })} required={form.status === "scheduled"} /></div>}</div>
        {selected?.published_at && <p className="text-sm text-muted-foreground">First published: {new Date(selected.published_at).toLocaleString("en-KE")} · Address: /insights/{selected.slug}</p>}
        <Button type="submit" disabled={busy}><Save />{busy ? "Saving…" : "Save article"}</Button>
      </form>
      {!!revisions.length && <details className="border-t mt-8 pt-5"><summary className="cursor-pointer font-semibold inline-flex gap-2"><History />Revision history ({revisions.length})</summary><ul className="divide-y mt-4">{revisions.map(r => <li key={r.id} className="py-4"><div className="flex justify-between gap-3"><span className="text-sm">Version {r.version} · {new Date(r.created_at).toLocaleString("en-KE")}</span><Button size="sm" variant="outline" onClick={() => restore(r.snapshot)}><RotateCcw />Restore draft</Button></div><details className="mt-2 text-sm"><summary className="cursor-pointer">View saved article</summary><pre className="whitespace-pre-wrap break-words text-xs mt-3">{JSON.stringify(r.snapshot, null, 2)}</pre></details></li>)}</ul></details>}
      </div>
    </div>
  </section>;
}