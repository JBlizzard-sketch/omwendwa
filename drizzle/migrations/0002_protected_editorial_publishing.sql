CREATE TABLE public.editorial_articles (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, title text NOT NULL DEFAULT '', excerpt text NOT NULL DEFAULT '', category text NOT NULL DEFAULT 'Legal Guides', content text NOT NULL DEFAULT '', meta_description text NOT NULL DEFAULT '', author_name text NOT NULL DEFAULT 'Rachel Mwendwa', status text NOT NULL DEFAULT 'draft', publish_at timestamptz, published_at timestamptz, updated_at timestamptz NOT NULL DEFAULT now(), created_by uuid DEFAULT auth.uid(), review_notes text NOT NULL DEFAULT '', version integer NOT NULL DEFAULT 1);
GRANT SELECT,INSERT,UPDATE ON public.editorial_articles TO authenticated;
GRANT ALL ON public.editorial_articles TO service_role;
ALTER TABLE public.editorial_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY editorial_read ON public.editorial_articles FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));
CREATE POLICY editorial_insert ON public.editorial_articles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));
CREATE POLICY editorial_update ON public.editorial_articles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor')) WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));
CREATE TABLE public.article_revisions (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), article_id uuid NOT NULL REFERENCES public.editorial_articles(id), version integer NOT NULL, snapshot jsonb NOT NULL, actor_id uuid, created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.article_revisions TO authenticated;
GRANT ALL ON public.article_revisions TO service_role;
ALTER TABLE public.article_revisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY revisions_read ON public.article_revisions FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));
CREATE TABLE public.published_articles (id uuid PRIMARY KEY REFERENCES public.editorial_articles(id), slug text NOT NULL UNIQUE, title text NOT NULL, excerpt text NOT NULL, category text NOT NULL, content text NOT NULL, meta_description text NOT NULL, author_name text NOT NULL, published_at timestamptz NOT NULL, updated_at timestamptz NOT NULL, visible_at timestamptz NOT NULL, archived boolean NOT NULL DEFAULT false);
GRANT SELECT ON public.published_articles TO anon, authenticated;
GRANT ALL ON public.published_articles TO service_role;
ALTER TABLE public.published_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY public_articles_read ON public.published_articles FOR SELECT TO anon,authenticated USING (NOT archived AND visible_at <= now());
CREATE FUNCTION public.validate_editorial_article() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
IF NEW.slug !~ '^[a-z0-9]+(-[a-z0-9]+)*$' OR length(NEW.slug)>160 THEN RAISE EXCEPTION 'Use a lowercase hyphenated article address'; END IF;
IF NEW.status NOT IN ('draft','review','approved','scheduled','published','archived') THEN RAISE EXCEPTION 'Invalid article status'; END IF;
IF TG_OP='UPDATE' AND NEW.slug<>OLD.slug THEN RAISE EXCEPTION 'Article addresses cannot change'; END IF;
IF auth.uid() IS NOT NULL AND NOT public.has_role(auth.uid(),'admin') THEN
IF NEW.status NOT IN ('draft','review') THEN RAISE EXCEPTION 'Only administrators approve or publish articles'; END IF;
IF TG_OP='UPDATE' AND (NEW.published_at IS DISTINCT FROM OLD.published_at OR NEW.publish_at IS DISTINCT FROM OLD.publish_at) THEN RAISE EXCEPTION 'Only administrators set publication dates'; END IF;
END IF;
IF NEW.status IN ('approved','scheduled','published') AND (length(trim(NEW.title))<5 OR length(trim(NEW.content))<50 OR length(trim(NEW.excerpt))<10) THEN RAISE EXCEPTION 'Add a title, summary and article before approval'; END IF;
IF NEW.status='scheduled' AND (NEW.publish_at IS NULL OR NEW.publish_at<=now()) THEN RAISE EXCEPTION 'Choose a future publication time'; END IF;
IF NEW.status IN ('scheduled','published') AND (TG_OP='INSERT' OR OLD.status NOT IN ('approved','scheduled','published')) THEN RAISE EXCEPTION 'Approve the article before publication'; END IF;
IF TG_OP='UPDATE' THEN NEW.published_at:=OLD.published_at; NEW.version:=OLD.version+1; END IF;
IF NEW.status='published' THEN NEW.published_at:=coalesce(NEW.published_at,now()); END IF;
IF NEW.status='scheduled' THEN NEW.published_at:=coalesce(NEW.published_at,NEW.publish_at); END IF;
NEW.updated_at:=now(); RETURN NEW;
END $$;
CREATE TRIGGER validate_editorial BEFORE INSERT OR UPDATE ON public.editorial_articles FOR EACH ROW EXECUTE FUNCTION public.validate_editorial_article();
CREATE FUNCTION public.record_editorial_revision() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
INSERT INTO public.article_revisions(article_id,version,snapshot,actor_id) VALUES(NEW.id,NEW.version,to_jsonb(NEW),auth.uid());
IF NEW.status IN ('published','scheduled') THEN
INSERT INTO public.published_articles(id,slug,title,excerpt,category,content,meta_description,author_name,published_at,updated_at,visible_at,archived) VALUES(NEW.id,NEW.slug,NEW.title,NEW.excerpt,NEW.category,NEW.content,NEW.meta_description,NEW.author_name,NEW.published_at,NEW.updated_at,CASE WHEN NEW.status='scheduled' THEN NEW.publish_at ELSE now() END,false)
ON CONFLICT(id) DO UPDATE SET title=EXCLUDED.title,excerpt=EXCLUDED.excerpt,category=EXCLUDED.category,content=EXCLUDED.content,meta_description=EXCLUDED.meta_description,author_name=EXCLUDED.author_name,published_at=EXCLUDED.published_at,updated_at=EXCLUDED.updated_at,visible_at=EXCLUDED.visible_at,archived=false;
ELSIF NEW.status='archived' THEN UPDATE public.published_articles SET archived=true WHERE id=NEW.id; END IF;
RETURN NEW;
END $$;
CREATE TRIGGER record_editorial AFTER INSERT OR UPDATE ON public.editorial_articles FOR EACH ROW EXECUTE FUNCTION public.record_editorial_revision();
CREATE TABLE public.ai_access_state (id text PRIMARY KEY, paused boolean NOT NULL DEFAULT false, status integer, message text, updated_at timestamptz NOT NULL DEFAULT now());
GRANT ALL ON public.ai_access_state TO service_role;
ALTER TABLE public.ai_access_state ENABLE ROW LEVEL SECURITY;