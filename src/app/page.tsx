import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Product from "@/components/Product";
import Features from "@/components/Features";
import Lifestyle from "@/components/Lifestyle";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <Product />
      <Features />
      <Lifestyle />
      <Testimonials />
      <Pricing />
      <Footer />
    </>
  );
}
