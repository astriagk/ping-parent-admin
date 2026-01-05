'use client'

import React, { useState } from 'react'

import Link from 'next/link'

import { Headset } from 'lucide-react'

interface CustomerSupportProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  color?: string
}

const BannerOne = ({
  title,
  description,
  icon,
  color = 'alert-solid-primary',
}: CustomerSupportProps) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="col-span-12">
      {isOpen && (
        <div className={`mb-5 alert-solid-${color} alert`}>
          <div className="flex items-center gap-3">
            {icon || (
              <Headset
                className={`text-${color}-100 fill-${color}-400/50 size-8`}
              />
            )}
            <div>
              <h6 className={`mb-1 font-medium text-${color}-50`}>{title}</h6>
              <p className={`text-${color}-200`}>{description}</p>
            </div>
            <Link
              href="#"
              onClick={handleClose}
              className={`absolute text-lg transition duration-300 ease-linear ltr:right-5 rtl:left-5 top-2 text-${color}-300 hover:text-${color}-100`}>
              <i className="ri-close-fill"></i>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default BannerOne
