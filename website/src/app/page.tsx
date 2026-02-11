import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import SnapFlipRead from "@/components/SnapFlipRead";
import Product from "@/components/Product";
import Features from "@/components/Features";
import ProductComparison from "@/components/ProductComparison";
import Lifestyle from "@/components/Lifestyle";
import Testimonials from "@/components/Testimonials";
import Accessories from "@/components/Accessories";
import Pricing from "@/components/Pricing";
import PurchaseInfo from "@/components/PurchaseInfo";
import FAQ from "@/components/FAQ";
import SocialProof from "@/components/SocialProof";
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
      <Accessories />
      <Pricing />
      <PurchaseInfo />
      <FAQ />
      <SocialProof />
      <Footer />
      <MobileStickyCTA />
    </>
  );
}
