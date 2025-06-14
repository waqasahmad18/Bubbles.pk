import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const db = await connectToDatabase()
    const result = await db.collection('products').insertOne(body)

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
    })
  } catch (error: any) {
    console.error('❌ Product Insert Error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Error saving product',
        error: error.message || error,
      },
      { status: 500 }
    )
  }
}

// ✅ Add this to fetch all products
export async function GET() {
  try {
    const db = await connectToDatabase()
    const products = await db.collection('products').find().toArray()

    return NextResponse.json(products)
  } catch (error: any) {
    console.error('❌ Product Fetch Error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching products',
        error: error.message || error,
      },
      { status: 500 }
    )
  }
}
