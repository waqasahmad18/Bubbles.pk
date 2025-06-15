import { connectToDatabase } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

// Utility to extract the ID from the URL
function extractIdFromUrl(req: NextRequest): string {
  const urlParts = req.url.split('/')
  return urlParts[urlParts.length - 1]
}

// ───── GET: Get product by ID ─────
export async function GET(req: NextRequest) {
  const id = extractIdFromUrl(req)

  try {
    const db = await connectToDatabase()
    const product = await db.collection('products').findOne({
      _id: new ObjectId(id),
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

// ───── PUT: Update product by ID ─────
export async function PUT(req: NextRequest) {
  const id = extractIdFromUrl(req)

  try {
    const body = await req.json()
    const {
      name,
      price,
      comparePrice,
      sku,
      category,
      description,
      images,
      colors,
      sizes,
    } = body

    if (!name || !price || !images || images.length === 0 || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const db = await connectToDatabase()

    await db.collection('products').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          price,
          comparePrice,
          sku,
          category,
          description,
          images,
          colors: colors || [],
          sizes: sizes || [],
        },
      }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

// ───── DELETE: Delete product by ID ─────
export async function DELETE(req: NextRequest) {
  const id = extractIdFromUrl(req)

  try {
    const db = await connectToDatabase()
    await db.collection('products').deleteOne({ _id: new ObjectId(id) })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
