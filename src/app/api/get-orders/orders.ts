import { connectToDatabase } from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const db = await connectToDatabase()
    const orders = await db.collection('orders').find().sort({ createdAt: -1 }).toArray()

    return NextResponse.json(orders)
  } catch (err) {
    console.error('❌ Error fetching orders:', err)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
