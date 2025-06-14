'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Products', href: '/admin/products' },
    { label: 'Add Product', href: '/admin/add-product' },
    { label: 'Inventory', href: '/admin/inventory' },
    { label: 'Orders', href: '/admin/orders' },
  ]

  return (
    <>
      {/* Mobile Header with Toggle Button */}
      <div className="md:hidden bg-black text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">Admin</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block w-1/2 sm:w-1/3 md:w-64 bg-maroon text-white h-full p-5 fixed md:relative z-50`}
      >
        <h2 className="text-2xl font-bold mb-8 hidden md:block">Admin Panel</h2>
        <ul className="space-y-4">
          {navItems.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block font-semibold ${
                  pathname === item.href ? 'underline text-yellow-300' : ''
                }`}
                onClick={() => setIsOpen(false)} // Close sidebar on mobile
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  )
}
