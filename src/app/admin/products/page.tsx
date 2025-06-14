'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Product = {
  _id: string
  name: string
  price: string
  comparePrice?: string
  sku?: string
  category?: string
  description?: string
  image: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    }

    fetchProducts()
  }, [])

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this product?')
    if (!confirmed) return

    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      alert('Product deleted')
      setProducts(products.filter(p => p._id !== id))
    } else {
      alert('Failed to delete product')
    }
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow p-4 border hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-1">SKU: {product.sku || '-'}</p>
            <p className="text-gray-800 font-bold">Rs. {product.price}</p>
            {product.comparePrice && (
              <p className="text-sm line-through text-red-500">
                . {product.comparePrice}
              </p>
            )}
            <p className="text-sm mt-2">{product.description}</p>
            <p className="text-xs italic text-gray-400 mt-1">
              Category: {product.category || 'N/A'}
            </p>

            <div className="mt-4 flex gap-2">
              <Link href={`/admin/edit-product?id=${product._id}`}>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
