import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { authReducer } from './features/auth'
import { layoutReducer } from './features/layout'
import { baseApi } from './services'

const rootReducer = combineReducers({
  Layout: layoutReducer,
  Auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
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
      }).concat(baseApi.middleware),
  })

const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
