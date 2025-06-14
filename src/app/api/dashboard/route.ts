import { connectToDatabase } from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const db = await connectToDatabase()

    const totalProducts = await db.collection('products').countDocuments()
    const totalOrders = await db.collection('orders').countDocuments() // Create this collection later if needed

    return NextResponse.json({
      totalProducts,
      totalOrders,
    })
  } catch (err) {
    console.error('Dashboard fetch error:', err)
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 })
  }
}
