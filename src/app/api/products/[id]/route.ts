import { connectToDatabase } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

type RouteParams = { params: { id: string } }

// ───── GET ─────
export async function GET(req: NextRequest, context: RouteParams) {
  const { id } = context.params

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
    console.error('❌ Fetch Error:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

// ───── PUT ─────
export async function PUT(req: NextRequest, context: RouteParams) {
  const { id } = context.params

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
    console.error('❌ Update Error:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

// ───── DELETE ─────
export async function DELETE(req: NextRequest, context: RouteParams) {
  const { id } = context.params

  try {
    const db = await connectToDatabase()
    await db.collection('products').deleteOne({ _id: new ObjectId(id) })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Delete Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
