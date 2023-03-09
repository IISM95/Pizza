import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slice/filterSlice'
import cartSlice from './slice/cartSlice'
import pizzaSlice from './slice/pizzaSlice'

export const store = configureStore({
  reducer: {
	filterSlice,
	cartSlice,
	pizzaSlice
},
})