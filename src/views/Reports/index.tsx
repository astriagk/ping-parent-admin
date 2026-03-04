'use client'

import React from 'react'

import { BarChart3, Car, DollarSign, Users } from 'lucide-react'

import BreadCrumb from '@src/shared/common/BreadCrumb'

const reportCards = [
  {
    title: 'Trip Reports',
    description: 'View trip summaries, distance covered, and attendance stats.',
    icon: Car,
    color: 'text-blue-500',
    bg: 'bg-blue-100',
  },
  {
    title: 'Payment Reports',
    description: 'Review payment transactions, revenue, and refund statistics.',
    icon: DollarSign,
    color: 'text-green-500',
    bg: 'bg-green-100',
  },
  {
    title: 'Driver Stats',
    description: 'Analyse driver performance, approvals, and activity.',
    icon: Users,
    color: 'text-purple-500',
    bg: 'bg-purple-100',
  },
  {
    title: 'Aggregate Analytics',
    description: 'Cross-school analytics for schools, students, and drivers.',
    icon: BarChart3,
    color: 'text-orange-500',
    bg: 'bg-orange-100',
  },
]

const Reports = () => {
  return (
    <React.Fragment>
      <BreadCrumb title="Reports" subTitle="Reports" />
      <div className="grid grid-cols-12 gap-x-space">
        {reportCards.map((card) => (
          <div key={card.title} className="col-span-12 md:col-span-6 xl:col-span-3 card">
            <div className="card-body flex items-start gap-4">
              <div className={`p-3 rounded-lg ${card.bg}`}>
                <card.icon className={`size-6 ${card.color}`} />
              </div>
              <div>
                <h6 className="mb-1 font-semibold">{card.title}</h6>
                <p className="text-sm text-gray-500">{card.description}</p>
                <button className="mt-3 btn btn-primary btn-sm">View Report</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

export default Reports
