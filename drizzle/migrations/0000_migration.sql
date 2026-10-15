CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL, email text NOT NULL, phone text,
  practice_area text, urgency text, message text NOT NULL,
  source text NOT NULL DEFAULT 'contact',
  status text NOT NULL DEFAULT 'new',
  consent_privacy boolean NOT NULL DEFAULT false,
  ip_hash text
);
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.consultation_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  reference text NOT NULL UNIQUE,
  name text NOT NULL, email text NOT NULL, phone text,
  practice_area text NOT NULL, urgency text, summary text NOT NULL,
  mode text NOT NULL DEFAULT 'video',
  slot_date date NOT NULL, slot_time text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  consent_privacy boolean NOT NULL DEFAULT false,
  ip_hash text
);
CREATE UNIQUE INDEX consultation_bookings_slot_unique ON public.consultation_bookings (slot_date, slot_time) WHERE status <> 'cancelled';
GRANT ALL ON public.consultation_bookings TO service_role;
ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  email text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'subscribed',
  consent_at timestamptz NOT NULL DEFAULT now(),
  ip_hash text
);
GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public view of taken slots only (no personal data)
CREATE OR REPLACE FUNCTION public.get_taken_slots(_from date, _to date)
RETURNS TABLE(slot_date date, slot_time text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT slot_date, slot_time FROM public.consultation_bookings
  WHERE status <> 'cancelled' AND slot_date BETWEEN _from AND _to
$$;
GRANT EXECUTE ON FUNCTION public.get_taken_slots(date, date) TO anon, authenticated;