'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EditProductPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('id')
  const router = useRouter()
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFiles = Array.from(e.target.files || []).slice(0, 4)
  const updated = [...files]
  selectedFiles.forEach((file, idx) => {
    updated[idx] = file
  })
  setFiles(updated)
}

  const [form, setForm] = useState({
    name: '',
    price: '',
    comparePrice: '',
    sku: '',
    category: '',
    description: '',
  })

  const [colors, setColors] = useState<string[]>([])
  const [colorInput, setColorInput] = useState('')
  const [sizes, setSizes] = useState<string[]>([])
  const [sizeInput, setSizeInput] = useState('')

  const [images, setImages] = useState<string[]>(['', '', '', ''])
  const [files, setFiles] = useState<(File | null)[]>([null, null, null, null])
  const [uploading, setUploading] = useState(false)

  const fetchProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`)
      const data = await res.json()

      if (res.ok) {
        setForm({
          name: data.name || '',
          price: data.price || '',
          comparePrice: data.comparePrice || '',
          sku: data.sku || '',
          category: data.category || '',
          description: data.description || '',
        })
        setColors(data.colors || [])
        setSizes(data.sizes || [])
        setImages(data.images || ['', '', '', ''])
      } else {
        alert(data.error || 'Failed to fetch product')
      }
    } catch (err) {
      alert('Error fetching product')
    }
  }

  useEffect(() => {
    if (productId) fetchProduct(productId)
  }, [productId])

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUpload = async () => {
    setUploading(true)
    const uploadedUrls = [...images]

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file) continue

      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'nextjs_uploads')
      formData.append('api_key', '118445692287378') // 👈 this line is required

      try {
        const res = await fetch(
  `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
  {
    method: 'POST',
    body: formData,
  }
)

        const data = await res.json()
        if (res.ok) {
          uploadedUrls[i] = data.secure_url
        } else {
          alert(`Image ${i + 1} failed: ${data.error?.message}`)
        }
      } catch {
        alert(`Upload error for image ${i + 1}`)
      }
    }

    setImages(uploadedUrls)
    setUploading(false)
  }

  const handleUpdate = async () => {
    if (!form.name || !form.price || !images.some(img => img) || !productId) {
      alert('Please fill all required fields')
      return
    }

    const payload = { ...form, images, colors, sizes }

    const res = await fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      alert('✅ Product updated successfully!')
      router.push('/admin/products')
    } else {
      const error = await res.json()
      alert(error.message || '❌ Update failed')
    }
  }

  const addColor = () => {
    if (colorInput.trim() && !colors.includes(colorInput)) {
      setColors([...colors, colorInput.trim()])
      setColorInput('')
    }
  }

  const removeColor = (c: string) => {
    setColors(colors.filter(clr => clr !== c))
  }

  const addSize = () => {
    if (sizeInput.trim() && !sizes.includes(sizeInput)) {
      setSizes([...sizes, sizeInput.trim()])
      setSizeInput('')
    }
  }

  const removeSize = (s: string) => {
    setSizes(sizes.filter(sz => sz !== s))
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="border p-2 rounded" />
        <input name="sku" value={form.sku} onChange={handleChange} placeholder="SKU" className="border p-2 rounded" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" />
        <input name="comparePrice" value={form.comparePrice} onChange={handleChange} placeholder="Compare at Price" className="border p-2 rounded" />

        <select name="category" value={form.category} onChange={handleChange} className="border p-2 rounded">
          <option value="">-- Select Category --</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>

           {/* Image Upload (Multiple) */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Product Images (Max 4)</label>
          <input type="file" multiple onChange={handleFileChange} />
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
  {[0, 1, 2, 3].map((i) => (
    <div key={i}>
      <input
        type="file"
        accept="image/*"
        id={`image-input-${i}`}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return

          const newFiles = [...files]
          newFiles[i] = file
          setFiles(newFiles)
        }}
      />
      <label htmlFor={`image-input-${i}`}>
        <div className="h-28 w-full border rounded cursor-pointer bg-gray-100 flex items-center justify-center overflow-hidden">
          {files[i] ? (
            <img
              src={URL.createObjectURL(files[i])}
              alt={`Preview ${i + 1}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-gray-400">Image {i + 1}</span>
          )}
        </div>
      </label>
    </div>
  ))}
</div>


          <button
            onClick={handleUpload}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {uploading ? 'Uploading...' : 'Upload Images'}
          </button>
        </div>

        {/* Colors */}
        <div className="md:col-span-2">
          <label className="font-semibold block mb-1">Available Colors</label>
          <div className="flex gap-2 mb-2">
            <input type="text" value={colorInput} onChange={(e) => setColorInput(e.target.value)} placeholder="Add a color" className="border px-3 py-2 rounded" />
            <button onClick={addColor} className="bg-black text-white px-4 py-2 rounded">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <span key={color} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2">
                {color}
                <button onClick={() => removeColor(color)} className="text-red-500 text-sm">x</button>
              </span>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="md:col-span-2">
          <label className="font-semibold block mb-1">Available Sizes</label>
          <div className="flex gap-2 mb-2">
            <input type="text" value={sizeInput} onChange={(e) => setSizeInput(e.target.value)} placeholder="Add a size" className="border px-3 py-2 rounded" />
            <button onClick={addSize} className="bg-black text-white px-4 py-2 rounded">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <span key={size} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2">
                {size}
                <button onClick={() => removeSize(size)} className="text-red-500 text-sm">x</button>
              </span>
            ))}
          </div>
        </div>

        <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="md:col-span-2 border p-2 rounded" placeholder="Product Description"></textarea>
      </div>

      <button onClick={handleUpdate} className="mt-6 bg-green-600 text-white px-6 py-3 rounded">
        Update Product
      </button>
    </div>
  )
}
