'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ClientProduct() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('pid')
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    if (!productId) return
    const fetchProduct = async () => {
      const res = await fetch(`/api/get-single-product?pid=${productId}`)
      const data = await res.json()
      setProduct(data)
    }
    fetchProduct()
  }, [productId])

  if (!product) return <p className="p-4">Loading...</p>

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p>Price: Rs.{product.price}</p>
      {/* show more details if needed */}
    </div>
  )
}
