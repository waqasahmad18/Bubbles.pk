'use client'

import { useCart } from '@/context/cart-context'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function CartDrawer() {
  const { cart, clearCart, isOpen, closeCart } = useCart()
  const router = useRouter()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-xl p-6 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <button onClick={closeCart}>
                <XMarkIcon className="w-6 h-6 text-gray-600 hover:text-black" />
              </button>
            </div>

            {/* Clear All */}
            {cart.length > 0 && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:underline"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Cart Items */}
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center gap-4 border-b pb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      {item.size && <p className="text-sm">Size: {item.size}</p>}
                      {item.color && <p className="text-sm">Color: {item.color}</p>}
                      <p className="text-sm text-gray-600">
                        {item.quantity} × Rs.{item.price.toLocaleString()} = Rs.
                        {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Checkout Button */}
            {cart.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={() => {
                    closeCart()
                    router.push('/checkout')
                  }}
                  className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
