// This route is dynamic runtime-only; should not be statically analyzed.

import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import jwt from 'jsonwebtoken'

type AdminUser = {
  email: string
  password: string
  role: string
}

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
  }

  try {
    const db = await connectToDatabase()
    const users = db.collection<AdminUser>('users')
    const user = await users.findOne({ email })

    if (!user || password !== user.password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined')
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
    })

    return response
  } catch (error) {
    console.error('❌ Login error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
