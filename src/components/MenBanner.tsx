'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function MenBanner() {
  return (
    <section className="relative h-[400px] md:h-[450px] lg:h-[900px] overflow-hidden cursor-pointer">
      {/* Clickable Full Area */}
      <Link href="/collections?cat=men" className="absolute inset-0 z-20" />

      {/* Background Image */}
      <Image
        src="/men.png"
        alt="Men's Collection"
        fill
        priority
        className="object-cover w-full h-full"
      />

      {/* Centered Text with Animation */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <h2 className="text-white text-3xl md:text-5xl font-extrabold uppercase drop-shadow-lg text-center tracking-wide">
          Men’s Collection
        </h2>
      </motion.div>
    </section>
  )
}
