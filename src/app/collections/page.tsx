'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function CollectionsPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get('cat') || 'men'

  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/get-products?category=${category}`)
      const data = await res.json()
      setProducts(data)
    }

    fetchProducts()
  }, [category])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8 capitalize">
          {category} Collection
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const discount = product.comparePrice
              ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
              : 0

            return (
              <Link
                key={product._id}
                href={`/product?pid=${product._id}`}
                className="block"
              >
                <div className="relative bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                  {/* Badges */}
                  <div className="absolute top-3 left-3 space-y-1 z-10">
                    <span className="bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded">
                      New
                    </span>
                    {discount > 0 && (
                      <span className="bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                        -{discount}%
                      </span>
                    )}
                  </div>

                  {/* Image */}
                  <div className="pb-2 pt-4 flex justify-center items-center h-56">
                    <img
  src={product.images?.[0] || '/placeholder.png'}
  alt={product.name}
  className="object-contain h-full w-auto"
/>
                  </div>

                  {/* Dots */}
                  <div className="flex justify-center gap-1 mb-2">
                    {Array(6)
                      .fill(0)
                      .map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-black' : 'bg-gray-300'}`}
                        />
                      ))}
                  </div>

                  {/* Name & Price */}
                  <p className="text-center font-medium text-sm text-gray-800 mb-1">{product.name}</p>
                  <div className="text-center text-sm font-semibold mb-4">
                    {product.comparePrice && (
                      <span className="line-through text-red-500 mr-2 text-xs">
                        Rs.{product.comparePrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-black">Rs.{product.price.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
