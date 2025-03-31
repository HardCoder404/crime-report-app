"use client"
import { useEffect, useState, useRef } from "react"
import FAQSection from "@/components/LandingPage/faq-page"
import GetInTouchSection from "@/components/LandingPage/get-in-touch-section"
import PricingPage from "@/components/LandingPage/pricing-page"
import Stats from "@/components/LandingPage/stats"
import TestimonialsSection from "@/components/LandingPage/testimonials-section"
import { motion, useInView, AnimatePresence } from "framer-motion"
import HomeSection from "@/components/LandingPage/homeSection"
import FeatureGrid from "@/components/LandingPage/feature-grid"
import Footer from "@/components/LandingPage/footer"

const fadeIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

// Component to handle animations with proper hydration
function AnimatedSection({ children, className = "" }:any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.3 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView) {
      setHasAnimated(true)
    } else {
      setHasAnimated(false) // Reset when out of view
    }
  }, [isInView])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeIn}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  // Add state to track if the component is mounted
  const [isMounted, setIsMounted] = useState(false)

  // Use useEffect to set mounted state after hydration
  useEffect(() => {
    // Small delay to ensure hydration is complete
    const timer = setTimeout(() => {
      setIsMounted(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [])

  // Force a re-render after mount to trigger animations
  const [key, setKey] = useState(0)
  useEffect(() => {
    if (isMounted) {
      // Force a re-render after mounting
      setKey(1)
    }
  }, [isMounted])

  return (
    <main className="relative px-6 pt-32">
      <div className="mx-auto max-w-5xl">
        <AnimatePresence>
          {isMounted && (
            <div key={key}>
              {/* Hero Section */}
              <AnimatedSection>
                <HomeSection />
              </AnimatedSection>

              {/* Features Grid */}
              <AnimatedSection>
                <FeatureGrid />
              </AnimatedSection>

              {/* Stats Section */}
              <AnimatedSection>
                <Stats />
              </AnimatedSection>

              {/* pricing  */}
              <AnimatedSection className="md:mt-20">
                <PricingPage />
              </AnimatedSection>

              {/* FAQ */}
                <FAQSection />

              {/* Testimonial */}
                <TestimonialsSection />

              {/* Get in Touch */}
                <GetInTouchSection />

              {/* Footer  */}
              <div className="mt-20 pb-5">
                <Footer />
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

