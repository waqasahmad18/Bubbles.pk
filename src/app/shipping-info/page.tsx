'use client'

import { motion } from 'framer-motion'

export default function ShippingInfoPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold text-[#1f1f1f] mb-6">Shipping Information</h1>
      <p className="text-lg text-gray-700 mb-8">
        We’re committed to delivering your order as quickly and safely as possible. Here’s everything you need to know about how we ship.
      </p>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-2xl font-semibold text-[#C6974C] mb-2">🚚 Delivery Time</h2>
          <p>
            Orders are processed within 24–48 hours. Standard shipping takes 3–5 business days across Pakistan. 
            Express shipping is available in selected cities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#C6974C] mb-2">📦 Packaging</h2>
          <p>
            All items are packaged with care to ensure they reach you in perfect condition. Eco-friendly packaging is used wherever possible.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#C6974C] mb-2">💸 Shipping Charges</h2>
          <p>
            Free shipping on orders above PKR 2,500. A flat fee of PKR 200 applies to orders below this threshold.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#C6974C] mb-2">🌍 International Shipping</h2>
          <p>
            Currently, we ship only within Pakistan. International shipping will be launching soon — stay tuned!
          </p>
        </section>
      </div>

      <div className="mt-10 border-t pt-4 text-sm text-gray-500">
        For any shipping concerns or tracking updates, feel free to contact our support team at <strong>support@bubbles.pk</strong>.
      </div>
    </motion.div>
  )
}
