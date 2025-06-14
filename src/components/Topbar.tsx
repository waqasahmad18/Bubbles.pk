'use client'

import { Bell, LogOut } from 'lucide-react'

export default function Topbar() {
  return (
    <header className="bg-black text-white px-6 py-4 shadow flex items-center justify-between">
      <h1 className="text-xl font-bold tracking-wide">Admin Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-300 hidden sm:block">
          Welcome, Admin
        </span>

        <button className="relative">
          <Bell className="h-5 w-5 text-white hover:text-gray-300" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="text-sm text-white hover:text-red-400 flex items-center gap-1">
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  )
}
