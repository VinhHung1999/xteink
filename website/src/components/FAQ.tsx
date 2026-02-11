import { getFAQData } from "@/services/api";
import FAQClient from "./FAQClient";

export default async function FAQ() {
  const faqItems = await getFAQData();
  return <FAQClient faqItems={faqItems} />;
}
