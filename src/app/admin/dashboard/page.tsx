'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch('/api/dashboard')
      const data = await res.json()
      setStats(data)
    }

    fetchStats()
  }, [])

  return (
    <div className="p-8">
      <motion.h1
        className="text-4xl font-extrabold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        👋 Welcome, Waqas
      </motion.h1>

      <motion.p
        className="text-gray-600 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Here's a live overview of your store performance.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-white rounded-lg shadow p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2">Total Products</h3>
          <p className="text-3xl font-extrabold text-blue-600">{stats.totalProducts}</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2">Total Orders</h3>
          <p className="text-3xl font-extrabold text-green-600">{stats.totalOrders}</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2">Low Stock (soon)</h3>
          <p className="text-3xl font-extrabold text-red-500">—</p>
        </motion.div>
      </div>
    </div>
  )
}
