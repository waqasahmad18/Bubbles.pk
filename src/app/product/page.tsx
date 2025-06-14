'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'

export default function ProductPage() {
  const searchParams = useSearchParams()
  const pid = searchParams.get('pid')

  const { addToCart, openCart } = useCart() // ✅ Include openCart
  const [product, setProduct] = useState<any>(null)
  const [related, setRelated] = useState<any[]>([])
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState<number>(1)

  useEffect(() => {
    if (pid) {
      fetch(`/api/get-single-product?pid=${pid}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data)

          fetch(`/api/get-products?category=${data.category}`)
            .then(res => res.json())
            .then(all => {
              const filtered = all.filter((p: any) => p._id !== data._id)
              setRelated(filtered.slice(0, 4))
            })
        })
    }
  }, [pid])

  if (!product) return <div className="p-10 text-center">Loading...</div>

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  const sizes: string[] = product.sizes || []
  const colors: string[] = product.colors || []

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      alert('Please select a size before adding to cart.')
      return
    }

    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      size: selectedSize || 'Default',
      color: selectedColor || 'Default',
    })

    openCart() // ✅ Open cart popup
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="grid grid-cols-2 gap-4">
          {(product.images?.length > 0 ? product.images : [product.image]).map((img: string, idx: number) => (
            <div key={idx} className="rounded overflow-hidden">
              <img src={img} alt={`Product ${idx}`} className="object-contain w-full h-60" />
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-sm text-gray-500 mb-1">{product.sku || 'SKU123456'}</p>

          <div className="flex items-center gap-4 mb-4">
            {product.comparePrice && (
              <p className="line-through text-red-500">Rs.{product.comparePrice.toLocaleString()}</p>
            )}
            <p className="text-xl font-semibold">Rs.{product.price.toLocaleString()}</p>
            {discount > 0 && (
              <span className="bg-black text-white text-xs px-2 py-1 rounded font-semibold">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Colors */}
          {colors.length > 0 && (
            <div className="mb-4">
              <p className="font-semibold mb-1">COLOR</p>
              <div className="flex gap-2 flex-wrap">
                {colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-1 text-sm rounded border ${selectedColor === color ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:border-black'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {sizes.length > 0 && (
            <div className="mb-4">
              <p className="font-semibold mb-1">SIZE</p>
              <div className="flex gap-2 mt-2">
                {sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border text-sm rounded ${selectedSize === size ? 'border-black bg-gray-100 font-semibold' : 'border-gray-300 hover:border-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <p className="font-semibold mb-1">Quantity</p>
            <div className="flex items-center gap-2 mt-2">
              <button
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-xl font-bold"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >-</button>
              <span className="w-10 text-center text-base">{quantity}</span>
              <button
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-xl font-bold"
                onClick={() => setQuantity(q => q + 1)}
              >+</button>
            </div>
          </div>

          {/* Add to Bag */}
          <button onClick={handleAddToCart} className="bg-black text-white w-full py-3 rounded font-semibold">
            ADD TO BAG
          </button>

          {/* Description */}
          <div className="mt-8">
            <h4 className="text-md font-semibold mb-2">Product Description</h4>
            <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
              {product.description?.split('\n').map((line: string, idx: number) => (
                <li key={idx}>{line}</li>
              )) || <li>Style and comfort for all-day wear.</li>}
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-16 mb-20">
          <h2 className="text-xl font-bold mb-6">Our Picks For You</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {related.map((item) => {
              const discount = item.comparePrice
                ? Math.round(((item.comparePrice - item.price) / item.comparePrice) * 100)
                : 0

              return (
                <Link
                  key={item._id}
                  href={`/product?pid=${item._id}`}
                  className="block border hover:shadow transition rounded overflow-hidden bg-white"
                >
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="w-full h-52 object-contain" />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="bg-blue-700 text-white text-xs px-2 py-1 rounded">New</span>
                      {discount > 0 && (
                        <span className="bg-black text-white text-xs px-2 py-1 rounded">-{discount}%</span>
                      )}
                    </div>
                    <div className="absolute bottom-0 w-full bg-black text-white text-center text-xs font-semibold py-1">
                      ONLINE EXCLUSIVE DISCOUNT
                    </div>
                  </div>

                  <div className="p-3 text-center">
                    <p className="text-sm font-medium mb-1">{item.name}</p>
                    <div className="text-sm font-semibold">
                      {item.comparePrice && (
                        <span className="line-through text-red-500 mr-2 text-xs">
                          Rs.{item.comparePrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-black">Rs.{item.price.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
