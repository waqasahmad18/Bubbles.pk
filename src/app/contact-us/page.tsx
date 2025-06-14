'use client'

import { motion } from 'framer-motion'

export default function ContactUsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-3xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold text-[#1f1f1f] mb-6">Contact Us</h1>
      <p className="text-gray-700 mb-8 text-lg">
        Have questions or feedback? We'd love to hear from you! Reach out to us through any of the following channels.
      </p>

      <div className="space-y-6 text-base text-gray-700">
        <div>
          <h3 className="font-semibold text-[#C6974C]">📧 Email</h3>
          <p>support@bubbles.pk</p>
        </div>

        <div>
          <h3 className="font-semibold text-[#C6974C]">📞 Phone</h3>
          <p>+92 300 1234567</p>
        </div>

        <div>
          <h3 className="font-semibold text-[#C6974C]">📍 Address</h3>
          <p>123 Fashion Street, Karachi, Pakistan</p>
        </div>
      </div>

      <div className="mt-12 border-t pt-6">
        <p className="text-sm text-gray-500">
          You can also DM us on Instagram or Facebook. We usually reply within a few hours!
        </p>
      </div>
    </motion.div>
  )
}
