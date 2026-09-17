import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Global, delegated GA4 click tracker.
 *
 * Any element (or ancestor of the click target) carrying `data-ga-event` emits
 * that event. Additional `data-ga-*` attributes become event params, converting
 * the dataset key back to snake_case:
 *
 *   data-ga-event="contact_click"
 *   data-ga-method="whatsapp"      -> { method: "whatsapp" }
 *   data-ga-item-status="open"     -> { item_status: "open" }
 *
 * Listens for both `click` and `auxclick` so middle-click / open-in-new-tab on
 * `target="_blank"` links (WhatsApp, socials) is still counted.
 */
export default function ClickTracker() {
  useEffect(() => {
    const handle = (event) => {
      const el = event.target?.closest?.("[data-ga-event]");
      if (!el) return;

      const name = el.dataset.gaEvent;
      if (!name) return;

      const params = {};
      for (const [key, value] of Object.entries(el.dataset)) {
        if (key === "gaEvent" || value == null) continue;
        if (!key.startsWith("ga")) continue;
        // "gaLocation" -> "location", "gaItemStatus" -> "item_status"
        const paramName = key
          .slice(2)
          .replace(/^[A-Z]/, (c) => c.toLowerCase())
          .replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
        params[paramName] = value;
      }

      trackEvent(name, params);
    };

    document.addEventListener("click", handle);
    document.addEventListener("auxclick", handle);
    return () => {
      document.removeEventListener("click", handle);
      document.removeEventListener("auxclick", handle);
    };
  }, []);

  return null;
}
