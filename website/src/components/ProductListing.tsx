import { getProductListing } from "@/services/api";
import ProductListingClient from "./ProductListingClient";

export default async function ProductListing() {
  const products = await getProductListing();
  return <ProductListingClient products={products} />;
}
