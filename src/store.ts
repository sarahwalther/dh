import { configureStore, getDefaultMiddleware, Store } from '@reduxjs/toolkit'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { rootReducer, RootState } from './reducers'
import logger from 'redux-logger'
import { Action, AnyAction } from 'redux'

export type DHDispatch = ThunkDispatch<RootState, void, AnyAction>
export type DHThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>
export type DHStore = Store<RootState, AnyAction> & { dispatch: DHDispatch }
export type DHGetState = () => RootState;

const store: DHStore = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware().concat(logger),
    thunk,
  ],
})

export default store
