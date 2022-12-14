import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './authSlice';

const store = configureStore({
    reducer: {
        authentication: AuthSlice
    },
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch