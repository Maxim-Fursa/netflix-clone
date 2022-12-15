import { createSlice } from '@reduxjs/toolkit'

interface IDimensions {
    width: number,
    height: number
}

const initialState: IDimensions = {
    width: 2000,
    height: 2000
}

const DimensionsState = createSlice({
    name: 'DimensionsState',
    initialState,
    reducers: {
        setDimensions: (state, action) => {
            const { width, height } = action.payload
            return {...state, width, height}
        }
    }
})

export const { setDimensions } = DimensionsState.actions
export default DimensionsState.reducer