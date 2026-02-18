'use client'

import React from 'react'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import {
  Bus,
  CreditCard,
  Users,
  GraduationCap,
  Car,
  Clock,
} from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  colorClass: string
  subtitle?: string
}

const StatCard = ({ title, value, icon, colorClass, subtitle }: StatCardProps) => (
  <div className="col-span-12 sm:col-span-6 xl:col-span-4 card">
    <div className="card-body">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-dark-500">{title}</p>
          <h4 className="mt-1 text-2xl font-semibold">{value}</h4>
          {subtitle && (
            <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
          )}
        </div>
        <div className={`flex items-center justify-center size-12 rounded-xl ${colorClass}`}>
          {icon}
        </div>
      </div>
    </div>
  </div>
)

const Dashboard = () => {
  return (
    <React.Fragment>
      <BreadCrumb title="Dashboard" subTitle="Overview" />
      <div className="grid grid-cols-12 gap-x-space">
        <StatCard
          title="Total Parents"
          value="—"
          icon={<Users className="size-6 text-blue-600" />}
          colorClass="bg-blue-100 dark:bg-blue-900/20"
        />
        <StatCard
          title="Total Drivers"
          value="—"
          icon={<Car className="size-6 text-green-600" />}
          colorClass="bg-green-100 dark:bg-green-900/20"
          subtitle="Pending approvals: —"
        />
        <StatCard
          title="Total Students"
          value="—"
          icon={<GraduationCap className="size-6 text-purple-600" />}
          colorClass="bg-purple-100 dark:bg-purple-900/20"
        />
        <StatCard
          title="Active Trips"
          value="—"
          icon={<Bus className="size-6 text-orange-600" />}
          colorClass="bg-orange-100 dark:bg-orange-900/20"
        />
        <StatCard
          title="Revenue (This Month)"
          value="₹—"
          icon={<CreditCard className="size-6 text-emerald-600" />}
          colorClass="bg-emerald-100 dark:bg-emerald-900/20"
        />
        <StatCard
          title="Pending Approvals"
          value="—"
          icon={<Clock className="size-6 text-red-600" />}
          colorClass="bg-red-100 dark:bg-red-900/20"
        />

        {/* Placeholder for charts */}
        <div className="col-span-12 card">
          <div className="card-header">
            <h5 className="card-title">Recent Activity</h5>
          </div>
          <div className="card-body">
            <p className="text-gray-500 dark:text-dark-500 text-sm">
              Dashboard charts and recent activity will be displayed here once
              connected to the API.
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
