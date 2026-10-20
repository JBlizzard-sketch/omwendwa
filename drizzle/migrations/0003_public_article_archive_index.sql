CREATE FUNCTION public.article_public_index() RETURNS TABLE(slug text,archived boolean) LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$ SELECT slug,archived FROM public.published_articles WHERE visible_at<=now() OR archived $$;
REVOKE ALL ON FUNCTION public.article_public_index() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.article_public_index() TO anon,authenticated,service_role;
REVOKE ALL ON FUNCTION public.record_editorial_revision() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.validate_editorial_article() FROM PUBLIC;