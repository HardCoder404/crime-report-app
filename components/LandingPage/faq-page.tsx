"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

type FAQItemProps = {
    question: string
    answer: string
    isOpen: boolean
    onToggle: () => void
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
    return (
        <div
            className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-6 transition-all hover:bg-zinc-800/80"
            onClick={onToggle}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative">
                <div className="flex items-center justify-between cursor-pointer">
                    <h3 className="text-lg font-medium text-white">{question}</h3>
                    <div className="inline-flex rounded-xl bg-sky-500/10 p-2">
                        {isOpen ? <Minus className="h-5 w-5 text-sky-400" /> : <Plus className="h-5 w-5 text-sky-400" />}
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <p className="mt-4 text-zinc-400">{answer}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const faqData = [
        {
            question: "How does the anonymous reporting work?",
            answer:
                "Our anonymous reporting system uses military-grade encryption to protect your identity. When you submit a report, your personal information is stripped away before it reaches authorities, ensuring complete anonymity while still allowing for two-way communication.",
        },
        {
            question: "Is my location shared automatically?",
            answer:
                "Location sharing is optional. You can choose to include your location for faster response times, or disable it completely for maximum privacy. Even when shared, your exact location is only visible to authorized emergency responders.",
        },
        {
            question: "How quickly will I receive a response?",
            answer:
                "Response times vary based on the nature of your report and local authority availability. Emergency situations are prioritized and typically receive immediate attention. Our real-time processing system ensures all reports are verified and routed to the appropriate authorities without delay.",
        },
        {
            question: "Can I attach evidence to my reports?",
            answer:
                "Yes, you can securely attach photos, videos, audio recordings, or documents to your reports. All attachments are encrypted and handled with the same level of security and anonymity as the rest of your report.",
        },
        {
            question: "What happens after I submit a report?",
            answer:
                "After submission, your report is encrypted and sent to the appropriate authorities. You'll receive a unique case number to track your report's status. Authorities may respond with questions or updates through our secure two-way communication channel.",
        },
        {
            question: "Is the service available worldwide?",
            answer:
                "Our service is currently available in select regions with plans for global expansion. Check our coverage map for availability in your area. We're constantly working with local law enforcement agencies to expand our reach.",
        },
    ]

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="py-12 px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Find answers to common questions about our secure reporting system and how we protect your privacy.
                    </p>
                </div>

                <div className="grid gap-4 md:gap-6">
                    {faqData.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

