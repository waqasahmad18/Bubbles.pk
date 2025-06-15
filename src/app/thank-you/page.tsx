'use client'

import Navbar from '@/components/Navbar'

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto text-center py-20">
        <h1 className="text-3xl font-bold mb-4">🎉 Thank you for your order!</h1>
        <p>We've received your order. You will get an email when its on the way.</p>
      </div>
    </>
  )
}
