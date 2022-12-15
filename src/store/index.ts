import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './authSlice';
import DimensionsSlice from './resizeSlice'

const store = configureStore({
    reducer: {
        authentication: AuthSlice,
        dimensions: DimensionsSlice
    },
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch