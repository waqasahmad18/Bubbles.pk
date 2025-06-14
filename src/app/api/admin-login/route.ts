import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type AdminUser = {
  email: string
  password: string
  role: string
}

export async function POST(req: Request) {
  const { email, password } = await req.json()

  // ❌ Block missing input
  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
  }

  try {
    const db = await connectToDatabase()
    const users = db.collection<AdminUser>('users')

    // 🔍 Find user ONLY — do not create anymore
    const user = await users.findOne({ email })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 401 })
    }

    // 🔐 Compare hashed password
   const validPassword = password === user.password

    // ❌ Block on invalid password
    if (!validPassword) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 })
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET!,
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
