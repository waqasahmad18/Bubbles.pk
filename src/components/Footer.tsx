'use client'

import Link from 'next/link'
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaSnapchatGhost,
} from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-[#fefefe] text-[#1f1f1f] border-t border-gray-200 px-6 py-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Left - Brand / About */}
        <div>
          <h2 className="text-2xl font-bold tracking-widest text-[#111] mb-4">Bubbles.pk</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Premium fashion and comfort, crafted with care.  
            Discover elegance in every step.
          </p>
        </div>

        {/* Center - Link Columns */}
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="text-md font-semibold text-[#111] mb-4 uppercase tracking-wide">Explore</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/collections?cat=men" className="hover:text-[#C6974C] transition cursor-pointer">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/collections?cat=women" className="hover:text-[#C6974C] transition cursor-pointer">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/collections?cat=kids" className="hover:text-[#C6974C] transition cursor-pointer">
                  Kids
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold text-[#111] mb-4 uppercase tracking-wide">Help</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/contact-us" className="hover:text-[#C6974C] transition cursor-pointer">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping-info" className="hover:text-[#C6974C] transition cursor-pointer">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#C6974C] transition cursor-pointer">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-[#C6974C] transition cursor-pointer">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right - Social Media */}
        <div className="md:text-right">
          <h4 className="text-md font-semibold text-[#111] mb-4 uppercase tracking-wide">Follow Us</h4>
          <div className="flex md:justify-end gap-4 text-xl text-gray-600">
            <FaFacebookF className="hover:text-[#C6974C] transition cursor-pointer" />
            <FaInstagram className="hover:text-[#C6974C] transition cursor-pointer" />
            <FaYoutube className="hover:text-[#C6974C] transition cursor-pointer" />
            <FaTiktok className="hover:text-[#C6974C] transition cursor-pointer" />
            <FaSnapchatGhost className="hover:text-[#C6974C] transition cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-xs text-gray-500 border-t pt-4">
        © 2025 Bubbles.pk. All Rights Reserved. Terms · Privacy · Contact
      </div>
    </footer>
  )
}
