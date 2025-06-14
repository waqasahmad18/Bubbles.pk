'use client'

import { useEffect, useState } from 'react'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data)
      })
      .catch(err => console.error('❌ Error fetching orders:', err))
  }, [])

  return (
    <div className="flex">
   
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">All Orders</h2>

          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul className="space-y-6">
              {orders.map((order, index) => (
                <li key={index} className="bg-white p-4 rounded shadow border">
                  <div className="mb-2">
                    <p><strong>Customer:</strong> {order.user?.name}</p>
                    <p>Email: {order.user?.email}</p>
                    <p>Phone: {order.user?.phone}</p>
                    <p>Address: {order.user?.address}</p>
                    <p>Status: <span className="text-yellow-600 font-semibold">{order.status}</span></p>
                    <p>Total: Rs. {order.totalAmount.toLocaleString()}</p>
                  </div>

                  <div className="border-t pt-3 mt-3">
                    <p className="font-semibold mb-2">Items:</p>
                    {order.items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 border-b py-2">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="text-sm">
                          <p>{item.name}</p>
                          <p>Qty: {item.quantity} | Size: {item.size} | Color: {item.color}</p>
                          <p>Rs. {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
   
  )
}
