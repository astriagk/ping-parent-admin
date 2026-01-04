'use client'

import React from 'react'

import { NextPageWithLayout } from '@src/dtos'
import { LAYOUT_DIRECTION } from '@src/shared/constants/layout'
import { useAppSelector } from '@src/store/hooks'
import SigninBasic from '@src/views/Auth/SignIn/SigninBasic'
import { ToastContainer } from 'react-toastify'

const SignInBasicPage: NextPageWithLayout = () => {
  const { layoutMode, layoutDirection } = useAppSelector(
    (state) => state.Layout
  )

  return (
    <React.Fragment>
      <SigninBasic />

      <ToastContainer
        theme={layoutMode}
        rtl={layoutDirection === LAYOUT_DIRECTION.RTL}
        position={
          layoutDirection === LAYOUT_DIRECTION.RTL ? 'top-left' : 'top-right'
        }
      />
    </React.Fragment>
  )
}

export default SignInBasicPage
