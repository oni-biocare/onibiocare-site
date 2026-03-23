/**
 * Server component — loads product data (fs access) then hands off to client.
 * This is intentionally a thin shell; all interactive logic lives in DoseResultsClient.
 */

import { getSortedProductsData } from "@/lib/products";
import DoseResultsClient from "./DoseResultsClient";

export default function DoseResultsPage() {
    // Server-side fs read — safe here, this is a server component
    const allProducts = getSortedProductsData();

    return <DoseResultsClient allProducts={allProducts} />;
}
