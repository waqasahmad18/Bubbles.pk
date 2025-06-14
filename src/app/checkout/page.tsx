'use client'

import { useCart } from '@/context/cart-context'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const res = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: form,
        items: cart,
      }),
    })

    if (res.ok) {
      clearCart()
      router.push('/thank-you')
    } else {
      alert('Something went wrong. Please try again.')
    }
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left: Order Summary */}
        <div>
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="border p-4 rounded flex gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    {item.size && <p className="text-sm">Size: {item.size}</p>}
                    {item.color && <p className="text-sm">Color: {item.color}</p>}
                    <p className="text-sm text-gray-600">
                      {item.quantity} × Rs.{item.price.toLocaleString()} = Rs.{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 font-semibold text-lg">
            Total: Rs.{total.toLocaleString()}
          </div>
        </div>

        {/* Right: Checkout Form */}
        <div>
          <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Name" required value={form.name} onChange={handleChange}
              className="w-full p-2 border rounded" />
            <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange}
              className="w-full p-2 border rounded" />
            <input type="text" name="phone" placeholder="Phone" required value={form.phone} onChange={handleChange}
              className="w-full p-2 border rounded" />
            <textarea name="address" placeholder="Full Address" required value={form.address} onChange={handleChange}
              className="w-full p-2 border rounded" rows={4} />

            <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
              Complete Order
            </button>
          </form>
        </div>
        
      </div>
    </>
  )
}
