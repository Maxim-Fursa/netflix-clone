import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IAuth {
    isAuth: boolean
}

const initialState: IAuth = {
    isAuth: false
}

const AuthState = createSlice({
    name: 'AuthState',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuth = true
            localStorage.setItem('auth', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.isAuth = false
            localStorage.removeItem('auth')
        }
    }
})

export const { login, logout } = AuthState.actions
export default AuthState.reducer