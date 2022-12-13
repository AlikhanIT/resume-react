import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import $api from '../http/index'

export const fetchQuests = createAsyncThunk('quest/fetchQuests', async (id) => {
  const { data } = await $api.get(`/questionnaire/${id}`)
  return data
})

export const fetchEditQuests = createAsyncThunk('quest/fetchEditQuests', async (params) => {
  const { data } = await $api.put(`/questionnaire/${params.id}`, params)
  return data
})

const initialState = {
  isLoading: true,
  quests: {},
}

export const questSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuests.pending, (state) => {
      state.quests = {}
    })
    builder.addCase(fetchQuests.fulfilled, (state, action) => {
      state.quests = action.payload
    })

    builder.addCase(fetchEditQuests.fulfilled, (state) => {
      state.quests = {}
    })
  },
})

// Action creators are generated for each case reducer function
export const {} = questSlice.actions

export default questSlice.reducer
