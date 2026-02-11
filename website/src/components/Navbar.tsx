import { getNavLinks } from "@/services/api";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const navLinks = await getNavLinks();
  return <NavbarClient navLinks={navLinks} />;
}
