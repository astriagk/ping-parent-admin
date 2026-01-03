import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { authReducer } from './features/auth'
import { layoutReducer } from './features/layout'

const rootReducer = combineReducers({
  Layout: layoutReducer,
  Auth: authReducer,
})

const reducer = (
  state: ReturnType<typeof rootReducer> | undefined,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }
    return nextState
  } else {
    return rootReducer(state, action)
  }
}

export const makeStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })

const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
