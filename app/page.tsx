"use client"
import FAQSection from "@/components/LandingPage/faq-page";
import GetInTouchSection from "@/components/LandingPage/get-in-touch-section";
import PricingPage from "@/components/LandingPage/pricing-page";
import Stats from "@/components/LandingPage/stats";
import TestimonialsSection from "@/components/LandingPage/testimonials-section";
import { motion } from "framer-motion";
import HomeSection from "@/components/LandingPage/homeSection";
import FeatureGrid from "@/components/LandingPage/feature-grid";
import Footer from "@/components/LandingPage/footer";

const fadeIn = {
  hidden: { opacity: 0, scale: 0.8 }, // Start with reduced size and opacity
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }, // Scale up to full size
};


export default function Home() {
  return (
    <main className="relative px-6 pt-32">
      <div className="mx-auto max-w-5xl">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
        >
          <HomeSection />
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          // viewport={{ once: true }}
          variants={fadeIn}
        >
          <FeatureGrid />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          // viewport={{ once: true }}
          variants={fadeIn}
        >
          <Stats />
        </motion.div>

        {/* pricing  */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          // viewport={{ once: true }}
          variants={fadeIn}
          className="mt-20"
        >
          <PricingPage />
        </motion.div>

        {/* FAQ */}
        <div className="mt-20">
          <FAQSection />
        </div>

        {/* Testimonial */}
        <div className="mt-20">
          <TestimonialsSection />
        </div>

        {/* Get in Touch */}
          <GetInTouchSection />
        {/* Trust Badge */}

        {/* Footer  */}
        <div className="mt-20 pb-5">
          <Footer/>
        </div>
      </div>
    </main>
  );
}
