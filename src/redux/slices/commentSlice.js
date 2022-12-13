import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import $api from '../http/index'

export const fetchComment = createAsyncThunk('comment/fetchComment', async (params) => {
  const { data } = await $api.post(`/comment/${params.id}`, params)
  return data
})

const initialState = {
  comments: [],
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

// Action creators are generated for each case reducer function
export const {} = commentSlice.actions

export default commentSlice.reducer
