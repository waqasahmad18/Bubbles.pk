'use client'

import CartDrawer from './CartDrawer'
import { useCart } from '@/context/cart-context'
import Link from 'next/link'
import {
  ShoppingBagIcon,
  UserIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

export default function Navbar() {
  const { cart, openCart } = useCart()

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-red">
          Bubbles.pk
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex space-x-6 text-[#1F1F1F] font-medium text-sm">
          <Link href="/collections?cat=men" className="hover:text-[#C6974C]">Men</Link>
          <Link href="/collections?cat=women" className="hover:text-[#C6974C]">Women</Link>
          <Link href="/collections?cat=kids" className="hover:text-[#C6974C]">Kids</Link>
          <Link href="/category/sale" className="hover:text-red-600 font-semibold">Sale</Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <div className="relative hidden md:block">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-3 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#C6974C]"
            />
          </div>

          {/* Account */}
          <Link href="/account">
            <UserIcon className="h-5 w-5 text-[#1F1F1F] hover:text-[#C6974C]" />
          </Link>

          {/* Cart Icon with Badge */}
          <button onClick={openCart} className="relative">
            <ShoppingBagIcon className="h-6 w-6 text-[#1F1F1F] hover:text-[#C6974C]" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

          {/* Cart Drawer Component */}
          <CartDrawer />
        </div>
      </div>
    </nav>
  )
}
