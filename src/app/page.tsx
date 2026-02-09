import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import SnapFlipRead from "@/components/SnapFlipRead";
import Product from "@/components/Product";
import Features from "@/components/Features";
import ProductComparison from "@/components/ProductComparison";
import Lifestyle from "@/components/Lifestyle";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <SnapFlipRead />
      <Product />
      <Features />
      <ProductComparison />
      <Lifestyle />
      <Testimonials />
      <Pricing />
      <Footer />
      <MobileStickyCTA />
    </>
  );
}
