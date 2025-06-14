'use client'

import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
