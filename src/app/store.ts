import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slice/filter/slice'
import cartSlice from './slice/cart/slice'
import pizzaSlice from './slice/pizzaSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
	filterSlice,
	cartSlice,
	pizzaSlice
},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch