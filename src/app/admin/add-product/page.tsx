'use client'

import { useState } from 'react'

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    comparePrice: '',
    sku: '',
    category: '',
    description: '',
  })

  const [files, setFiles] = useState<File[]>([])
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [colors, setColors] = useState<string[]>([])
  const [sizes, setSizes] = useState<string[]>([])
  const [newColor, setNewColor] = useState('')
  const [newSize, setNewSize] = useState('')

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: any) => {
    const selectedFiles = Array.from(e.target.files as FileList).slice(0, 4)
    setFiles(selectedFiles)
  }

  const handleUpload = async () => {
    if (files.length === 0) return alert('Select images')
    setUploading(true)

    const uploadedImages: string[] = []

    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'nextjs_uploads')
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!)
      formData.append('timestamp', String(Math.floor(Date.now() / 1000)))

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
          uploadedImages.push(data.secure_url)
        } else {
          alert(`Upload failed for one image: ${data.error?.message || 'Unknown error'}`)
        }
      } catch (err) {
        console.error('Upload error:', err)
        alert('Upload failed for one image')
      }
    }

    setImages(uploadedImages)
    setUploading(false)
  }

  const handleSubmit = async () => {
    if (!form.name || !form.price || images.length === 0 || !form.category) {
      alert('Please fill all required fields')
      return
    }

    const payload = {
      ...form,
      images,
      colors,
      sizes,
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (res.ok) {
        alert('✅ Product saved successfully!')
        setForm({
          name: '',
          price: '',
          comparePrice: '',
          sku: '',
          category: '',
          description: '',
        })
        setFiles([])
        setImages([])
        setColors([])
        setSizes([])
        setNewColor('')
        setNewSize('')
      } else {
        alert(`❌ Failed: ${data.message || 'Unknown error'}`)
      }
    } catch (err) {
      console.error(err)
      alert('Unexpected error occurred')
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md">
        {/* Product Name */}
        <div>
          <label className="block mb-1 font-medium">Product Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* SKU */}
        <div>
          <label className="block mb-1 font-medium">SKU</label>
          <input
            type="text"
            name="sku"
            value={form.sku}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price *</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Compare at Price */}
        <div>
          <label className="block mb-1 font-medium">Compare at Price</label>
          <input
            type="number"
            name="comparePrice"
            value={form.comparePrice}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="">-- Select Category --</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

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
        <div>
          <label className="block mb-1 font-medium">Available Colors</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="flex-1 border px-3 py-2 rounded-lg"
              placeholder="Add color"
            />
            <button
              type="button"
              className="bg-black text-white px-3 py-2 rounded-lg"
              onClick={() => {
                if (newColor && !colors.includes(newColor)) {
                  setColors([...colors, newColor])
                  setNewColor('')
                }
              }}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {colors.map((c, i) => (
              <span
                key={i}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label className="block mb-1 font-medium">Available Sizes</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              className="flex-1 border px-3 py-2 rounded-lg"
              placeholder="Add size (e.g. 41, M)"
            />
            <button
              type="button"
              className="bg-black text-white px-3 py-2 rounded-lg"
              onClick={() => {
                if (newSize && !sizes.includes(newSize)) {
                  setSizes([...sizes, newSize])
                  setNewSize('')
                }
              }}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s, i) => (
              <span
                key={i}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Product Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border px-3 py-2 rounded-lg"
          ></textarea>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Save Product
      </button>
    </div>
  )
}
