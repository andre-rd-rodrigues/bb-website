export const PRACTICE_AREA_TYPES = {
  citizens: "citizens",
  companies: "companies"
};

/**
 * Normalizes a practice-area `type` value ("Citizens" | "Company") to the
 * lowercase filter key used by the UI ("citizens" | "companies").
 */
export const normalizeType = (type = "") =>
  type.toLowerCase().startsWith("compan")
    ? PRACTICE_AREA_TYPES.companies
    : PRACTICE_AREA_TYPES.citizens;

/**
 * Returns a stable anchor slug for a practice area, falling back to a
 * slugified title when no explicit `slug` is present.
 */
export const getPracticeAreaSlug = (item = {}) => {
  if (item.slug) return item.slug;

  return String(item.title || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

/**
 * Pure filter used by the practice-areas page. Matches by audience type and a
 * case-insensitive substring across title + description.
 */
export const filterPracticeAreas = (services = [], { query = "", type } = {}) => {
  const normalizedQuery = query.trim().toLowerCase();

  return services.filter((service) => {
    const matchesType =
      !type || type === "all" || normalizeType(service.type) === type;

    const matchesQuery =
      !normalizedQuery ||
      `${service.title} ${service.description}`
        .toLowerCase()
        .includes(normalizedQuery);

    return matchesType && matchesQuery;
  });
};
