import { PERSON } from "./content";
import { SITE_URL } from "./site";

/**
 * lib/entity.ts — the canonical Person entity, built ONCE and reused by every
 * JSON-LD graph on the site (homepage, /about, /work …).
 *
 * Search engines unify documents into one identity by matching @id values, so
 * every page MUST reference `${SITE_URL}#sehaj-varma` — never invent a second
 * Person node. Adding an external profile? Append it to SAME_AS only; the
 * graphs pick it up automatically.
 */

export const PERSON_ID = `${SITE_URL}#sehaj-varma`;

export const SAME_AS = [
  PERSON.github,
  PERSON.linkedin,
  PERSON.instagram,
  PERSON.githubRepo,
];

/** The shared Person node — spread into any page's @graph. */
export const personEntity = (overrides: Record<string, unknown> = {}) => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: PERSON.name,
  givenName: "Sehaj",
  familyName: "Varma",
  alternateName: "Sehaj",
  identifier: PERSON.handle, // GitHub username
  url: SITE_URL,
  image: `${SITE_URL}og-image.png`,
  jobTitle: PERSON.role,
  email: `mailto:${PERSON.email}`,
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: SAME_AS,
  ...overrides,
});
