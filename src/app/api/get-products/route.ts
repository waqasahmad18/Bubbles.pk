import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const category = url.searchParams.get('category')?.toLowerCase()

  const db = await connectToDatabase()

  const query: any = {}
  if (category) {
    query.category = category
  }

  const products = await db.collection('products').find(query).toArray()

  return NextResponse.json(products)
}
