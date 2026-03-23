/**
 * Static mapping of DOSE hormone sections to product IDs.
 * Products are tagged in their .md frontmatter with `doseHormones`.
 * This config mirrors that data for client-side filtering without fs access.
 *
 * Hormone → product ID mapping:
 *   dopamine    → Nigaribi (energy/vitality boost)
 *   oxytocin    → Sữa Anpha (bonding, emotional health)
 *   serotonin   → All products (serotonin affects mood/sleep broadly)
 *   endorphins  → Magne Oil products (pain relief, muscle recovery)
 */

import type { DoseSectionKey } from "@/lib/dose/types";
import type { Product } from "@/lib/products";

/** Priority order: which products to show FIRST for a given hormone */
export const DOSE_PRODUCT_PRIORITY: Record<DoseSectionKey, string[]> = {
  dopamine: ["nigaribi", "magne_oil_10ml", "anpha-milk"],
  oxytocin: ["anpha-milk", "nigaribi", "magne_oil"],
  serotonin: ["anpha-milk", "nigaribi", "magne_oil"],
  endorphins: ["magne_oil", "magne_oil_scroll_10ml", "magne_oil_10ml"],
};

/** Max products to show in the suggestion panel */
export const MAX_SUGGESTIONS = 3;

/**
 * Returns up to MAX_SUGGESTIONS products for a given hormone,
 * ordered by DOSE_PRODUCT_PRIORITY.
 */
export function getSuggestedProducts(
  hormone: DoseSectionKey,
  allProducts: Omit<Product, "content">[],
): Omit<Product, "content">[] {
  const priority = DOSE_PRODUCT_PRIORITY[hormone];

  // Products tagged for this hormone, in priority order
  const tagged = priority
    .map((id) => allProducts.find((p) => p.id === id))
    .filter((p): p is Omit<Product, "content"> => {
      if (!p) return false;
      return (p.doseHormones ?? []).includes(hormone);
    });

  // Fallback: if not enough tagged, fill with any remaining products tagged for this hormone
  if (tagged.length < MAX_SUGGESTIONS) {
    const taggedIds = new Set(tagged.map((p) => p.id));
    const extras = allProducts
      .filter(
        (p) =>
          !taggedIds.has(p.id) && (p.doseHormones ?? []).includes(hormone),
      )
      .slice(0, MAX_SUGGESTIONS - tagged.length);
    return [...tagged, ...extras];
  }

  return tagged.slice(0, MAX_SUGGESTIONS);
}
