'use client'

import { motion } from 'framer-motion'

export default function ReturnsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold text-[#1f1f1f] mb-6">Return & Exchange Policy</h1>
      <p className="text-lg text-gray-700 mb-8">
        {"Your satisfaction is our priority. Here's everything you need to know about our return and exchange policy."}
      </p>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold text-[#C6974C] mb-2">⏳ Return Window</h2>
          <p>
            {"Products can be returned or exchanged within 7 days of delivery. Items must be unused, unwashed, and in original packaging."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#C6974C] mb-2">🚫 Non-returnable Items</h2>
          <p>
            {"Sale items, innerwear, and customized orders are non-returnable unless defective or damaged during delivery."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#C6974C] mb-2">💳 Refunds</h2>
          <p>
            {"Once the return is approved, refunds are processed within 5–7 business days via your original payment method."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#C6974C] mb-2">🔄 Exchanges</h2>
          <p>
            {"Size or item exchanges are allowed within 7 days. Simply email us your request and we'll guide you through the process."}
          </p>
        </section>
      </div>

      <div className="mt-10 border-t pt-4 text-sm text-gray-500">
        {"For return inquiries, email us at "}
        <strong>support@bubbles.pk</strong>
        {" or message us on our official Instagram page."}
      </div>
    </motion.div>
  )
}
