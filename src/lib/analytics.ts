/**
 * Lightweight, provider-agnostic conversion tracking.
 *
 * Events are pushed to window.dataLayer (GTM), forwarded to gtag / plausible /
 * posthog when present, and mirrored to a local buffer so nothing is lost
 * before a provider script loads.
 */

export type AnalyticsEvent =
  | "cta_call_click"
  | "cta_whatsapp_click"
  | "cta_consult_click"
  | "cta_sticky_bar_click"
  | "cta_exit_intent_click"
  | "case_study_view"
  | "case_study_consultation_request"
  | "consultation_step_completed"
  | "consultation_booking_confirmed"
  | "compliance_checker_started"
  | "compliance_report_generated"
  | "compliance_report_shared"
  | "compliance_report_downloaded"
  | "newsletter_signup"
  | "blog_category_filter"
  | "blog_pagination"
  | "search_opened"
  | "search_result_selected";

export interface AnalyticsPayload {
  [key: string]: string | number | boolean | undefined;
}

interface TrackedEvent {
  event: AnalyticsEvent;
  params: AnalyticsPayload;
  ts: number;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, opts?: { props?: AnalyticsPayload }) => void;
    posthog?: { capture: (event: string, props?: AnalyticsPayload) => void };
    __omwEvents?: TrackedEvent[];
  }
}

export function trackEvent(event: AnalyticsEvent, params: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  const payload: AnalyticsPayload = {
    ...params,
    page_path: window.location.pathname,
  };

  window.__omwEvents = window.__omwEvents ?? [];
  window.__omwEvents.push({ event, params: payload, ts: Date.now() });

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });

  window.gtag?.("event", event, payload);
  window.plausible?.(event, { props: payload });
  window.posthog?.capture(event, payload);

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, payload);
  }
}

/** Convenience for onClick handlers: trackCta("cta_call_click", { location: "header" }) */
export const trackCta = (event: AnalyticsEvent, location: string, extra: AnalyticsPayload = {}) =>
  trackEvent(event, { location, ...extra });
