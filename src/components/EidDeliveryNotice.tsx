'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function EidDeliveryNotice() {
  return (
    <section className="bg-[#f9f9f9] py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* Left: Scooter Image with animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-shrink-0"
        >
          <Image
            src="/scooter.png"
            alt="Bubbles delivery scooter"
            width={500}
            height={500}
            className="w-full max-w-sm"
          />
        </motion.div>

        {/* Right: Text Content with animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-snug">
            Final Days to Order <br /> <span className="text-red-600">Before Eid!</span>
          </h2>

          <ul className="text-lg font-semibold text-gray-700 space-y-2 mb-6">
            <li><span className="text-red-600">1st JUNE</span> – Nationwide</li>
            <li><span className="text-red-600">2nd JUNE</span> – Punjab Only</li>
            <li><span className="text-red-600">3rd JUNE</span> – Lahore Only</li>
          </ul>

          <p className="text-sm font-medium text-gray-600">
            Orders placed on <strong>4th June</strong> and after <strong>4th June</strong> will be
            <span className="text-red-600"> delivered after Eid</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
