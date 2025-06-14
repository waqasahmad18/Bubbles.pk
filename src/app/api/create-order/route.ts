import {  connectToDatabase } from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  const { user, items } = body

  if (!user || !items || items.length === 0) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 })
  }

  const order = {
    user,
    items,
    totalAmount: items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0),
    status: 'pending',
    createdAt: new Date(),
  }

  const db = await  connectToDatabase()
  const collection = db.collection('orders')

  await collection.insertOne(order)

  return NextResponse.json({ success: true })
}
