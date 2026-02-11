import { getAccessories } from "@/services/api";
import AccessoriesClient from "./AccessoriesClient";

export default async function Accessories() {
  const accessories = await getAccessories();
  return <AccessoriesClient accessories={accessories} />;
}
