import { sendGAEvent } from "@next/third-parties/google";

/**
 * Centralized GA4 event tracking for core user actions.
 *
 * The goal is consistency: instead of dozens of one-off event names, we emit a
 * small, stable set of events with descriptive parameters (`method`,
 * `location`, `network`, ...). In GA4 you build a single report per event and
 * break it down by parameter — e.g. all `contact_click` events split by
 * WhatsApp / phone / email, and by where on the site they happened.
 *
 * Most click-based actions are tracked declaratively: annotate an element with
 * `data-ga-*` attributes (see `gaAttrs`) and the global <ClickTracker> picks
 * them up via event delegation. Non-click conversions (e.g. an async form
 * submission) call `trackEvent` / helpers directly.
 */

/** Low-level dispatch. Safe no-op during SSR or before GA has loaded. */
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined" || !name) return;
  sendGAEvent("event", name, params);
}

/**
 * Build the `data-ga-*` attribute set consumed by <ClickTracker>. Keeps call
 * sites tidy and naming consistent:
 *
 *   <a {...gaAttrs("contact_click", { method: "whatsapp", location: "navbar" })} />
 *   // => data-ga-event="contact_click" data-ga-method="whatsapp" data-ga-location="navbar"
 *
 * Param keys map to GA params by the same rule ClickTracker uses in reverse:
 * `item_status` <-> `data-ga-item-status`.
 */
export function gaAttrs(name, params = {}) {
  const attrs = { "data-ga-event": name };
  for (const [key, value] of Object.entries(params)) {
    if (value == null) continue;
    attrs[`data-ga-${key.replace(/_/g, "-")}`] = String(value);
  }
  return attrs;
}

/**
 * Normalize a contact link into a channel we can segment by in GA4.
 * @param {string} href
 * @returns {"whatsapp"|"phone"|"email"|"map"|"link"}
 */
export function resolveContactMethod(href = "") {
  if (/wa\.me|whatsapp|api\.whatsapp/i.test(href)) return "whatsapp";
  if (href.startsWith("tel:")) return "phone";
  if (href.startsWith("mailto:")) return "email";
  if (/maps\.|goo\.gl\/maps|google\.[^/]+\/maps/i.test(href)) return "map";
  return "link";
}

/**
 * Normalize a social icon name (or href) into a network label.
 * @param {string} value icon id (e.g. "mdi:instagram") or href
 * @returns {"whatsapp"|"facebook"|"instagram"|"linkedin"|"social"}
 */
export function resolveSocialNetwork(value = "") {
  if (/whatsapp/i.test(value)) return "whatsapp";
  if (/facebook|fb\b/i.test(value)) return "facebook";
  if (/instagram/i.test(value)) return "instagram";
  if (/linkedin/i.test(value)) return "linkedin";
  return "social";
}

/**
 * A lead captured through the on-site contact form. `generate_lead` is a GA4
 * recommended event, so it slots into standard lead-gen reports automatically.
 * Fired imperatively because form success is not a DOM click.
 */
export function trackGenerateLead({ subject, location = "contacts_page" } = {}) {
  trackEvent("generate_lead", { subject, location });
}
