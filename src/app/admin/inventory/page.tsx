'use client'

import { useEffect, useState } from 'react'

type Product = {
  _id: string
  name: string
  image: string
  inventory?: {
    stock: number
    lowStockThreshold: number
  }
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    }

    fetchProducts()
  }, [])

  const handleInventoryChange = (id: string, field: 'stock' | 'lowStockThreshold', value: number) => {
    setProducts(prev =>
      prev.map(product =>
        product._id === id
          ? {
              ...product,
              inventory: {
                stock: field === 'stock' ? value : product.inventory?.stock || 0,
                lowStockThreshold: field === 'lowStockThreshold' ? value : product.inventory?.lowStockThreshold || 0,
              },
            }
          : product
      )
    )
  }

  const handleUpdate = async (id: string, inventory: Product['inventory']) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inventory }),
      })

      if (res.ok) {
        alert('✅ Inventory updated')
      } else {
        alert('❌ Update failed')
      }
    } catch (err) {
      console.error(err)
      alert('Error updating inventory')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Inventory Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow rounded p-4 border">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="text-lg font-semibold">{product.name}</h3>

            <div className="mt-4 space-y-2">
              <div>
                <label className="block text-sm font-medium">Stock</label>
                <input
                  type="number"
                  className="w-full border rounded p-1"
                  value={product.inventory?.stock || 0}
                  onChange={(e) => handleInventoryChange(product._id, 'stock', parseInt(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Low Stock Threshold</label>
                <input
                  type="number"
                  className="w-full border rounded p-1"
                  value={product.inventory?.lowStockThreshold || 0}
                  onChange={(e) => handleInventoryChange(product._id, 'lowStockThreshold', parseInt(e.target.value))}
                />
              </div>

              <button
                onClick={() => handleUpdate(product._id, product.inventory!)}
                className="mt-2 bg-green-600 text-white px-4 py-1 rounded text-sm"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
