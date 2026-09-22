/**
 * Lightweight client error capture.
 *
 * Sentry is only initialised when VITE_SENTRY_DSN is provided, so local and
 * preview builds stay silent. Errors are always mirrored into a small
 * in-memory buffer the /diagnostics page can display.
 */
import * as Sentry from "@sentry/browser";

export interface CapturedError {
  message: string;
  source: string;
  at: string;
}

const buffer: CapturedError[] = [];

export const recentErrors = (): CapturedError[] => [...buffer];

const push = (message: string, source: string) => {
  buffer.unshift({ message, source, at: new Date().toISOString() });
  if (buffer.length > 25) buffer.pop();
};

export const initErrorMonitoring = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;

  if (dsn) {
    Sentry.init({
      dsn,
      environment: import.meta.env.MODE,
      tracesSampleRate: 0.1,
      sendDefaultPii: false,
    });
  }

  window.addEventListener("error", (event) => {
    push(event.message || String(event.error), "window.onerror");
  });

  window.addEventListener("unhandledrejection", (event) => {
    push(String((event as PromiseRejectionEvent).reason), "unhandledrejection");
  });
};

export const monitoringEnabled = () => Boolean(import.meta.env.VITE_SENTRY_DSN);
