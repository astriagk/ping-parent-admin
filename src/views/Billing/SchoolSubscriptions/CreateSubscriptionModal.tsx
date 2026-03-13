'use client'

import React, { useState } from 'react'

import { useGetSubscriptionPlansQuery } from '@src/store/services/subscriptionApi'
import { useCreateSchoolSubscriptionMutation } from '@src/store/services/subscriptionApi'
import { toast } from 'react-toastify'

interface CreateSubscriptionModalProps {
  open: boolean
  schoolId: string
  onClose: () => void
}

const CreateSubscriptionModal: React.FC<CreateSubscriptionModalProps> = ({
  open,
  schoolId,
  onClose,
}) => {
  const { data: plansData } = useGetSubscriptionPlansQuery()
  const [createSubscription, { isLoading }] =
    useCreateSchoolSubscriptionMutation()
  const [form, setForm] = useState({ plan_id: '', startDate: '', endDate: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createSubscription({
        school_id: schoolId,
        plan_id: form.plan_id,
        start_date: form.startDate,
        end_date: form.endDate,
      }).unwrap()
      setForm({ plan_id: '', startDate: '', endDate: '' })
      onClose()
      toast.success('Subscription created successfully')
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create subscription')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-dark-900 rounded-lg shadow-xl w-full max-w-md p-6">
        <h5 className="text-lg font-semibold mb-4">Create Subscription</h5>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Plan</label>
            <select
              className="form-select"
              value={form.plan_id}
              onChange={(e) => setForm({ ...form, plan_id: e.target.value })}
              required>
              <option value="">-- Select Plan --</option>
              {plansData?.data
                ?.filter((p) => p.is_active)
                .map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.plan_name} — {p.plan_type} (₹{p.price})
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="form-label">Start Date</label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              className="form-input"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="form-label">End Date</label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              className="form-input"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="btn btn-light btn-sm"
              onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={isLoading}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateSubscriptionModal
