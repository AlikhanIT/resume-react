import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import $api from '../http/index'

const initialState = {
  sidebarShow: true,
  unfoldable: false,
}

export const sideSlice = createSlice({
  name: 'side',
  initialState,
  reducers: {
    setSidebarShow: (state) => {
      state.sidebarShow = !state.sidebarShow
    },
    setUnfoldable: (state) => {
      state.unfoldable = !state.unfoldable
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSidebarShow, setUnfoldable } = sideSlice.actions

export default sideSlice.reducer
