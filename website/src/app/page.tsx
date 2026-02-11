import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import SnapFlipRead from "@/components/SnapFlipRead";
import Product from "@/components/Product";
import Features from "@/components/Features";
import Lifestyle from "@/components/Lifestyle";
import Testimonials from "@/components/Testimonials";
import Accessories from "@/components/Accessories";
import Pricing from "@/components/Pricing";
import MobileStickyCTA from "@/components/MobileStickyCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <SnapFlipRead />
      <Product />
      <Features />
      <Lifestyle />
      <Testimonials />
      <Accessories />
      <Pricing />
      <MobileStickyCTA />
    </>
  );
}
