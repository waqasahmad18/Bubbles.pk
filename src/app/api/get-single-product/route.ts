import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const pid = url.searchParams.get('pid')

    // ✅ Check if pid is provided and valid
    if (!pid || !ObjectId.isValid(pid)) {
      return NextResponse.json({ error: 'Invalid or missing product ID' }, { status: 400 })
    }

    const db = await connectToDatabase()

    // ✅ Fetch product by _id
    const product = await db.collection('products').findOne({ _id: new ObjectId(pid) })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('GET /api/get-single-product error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
