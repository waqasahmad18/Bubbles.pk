'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function BalloonBanner() {
  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[950px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/baloon.png"
        alt="Bubbles Balloon Banner"
        fill
        priority
        className="object-cover w-full h-full"
      />

      {/* Animated Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg uppercase text-center">
          WALK IN JOY
        </h1>
      </motion.div>
    </section>
  )
}
