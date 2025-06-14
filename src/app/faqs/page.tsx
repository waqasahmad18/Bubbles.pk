'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const faqs = [
  {
    question: 'What is your return policy?',
    answer: 'You can return or exchange products within 7 days of delivery, provided they are unused and in original packaging.',
  },
  {
    question: 'Do you offer free shipping?',
    answer: 'Yes, we offer free shipping on all orders above PKR 2,500 across Pakistan.',
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is shipped, we will send you a tracking number via email or SMS.',
  },
  {
    question: 'Can I change my order after placing it?',
    answer: 'Yes, you can contact us within 12 hours of placing the order to make any changes.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Currently, we only ship within Pakistan. International shipping will be launching soon!',
  },
]

export default function FaqsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold text-[#1f1f1f] mb-6">Frequently Asked Questions</h1>
      <p className="text-lg text-gray-700 mb-8">
        Find answers to the most common questions below.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left text-lg font-semibold text-[#C6974C] focus:outline-none"
            >
              {faq.question}
            </button>
            {activeIndex === index && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 text-gray-700"
              >
                {faq.answer}
              </motion.p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 border-t pt-4 text-sm text-gray-500">
        Still need help? Email us at <strong>support@bubbles.pk</strong>
      </div>
    </motion.div>
  )
}
