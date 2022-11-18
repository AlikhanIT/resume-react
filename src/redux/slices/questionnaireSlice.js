import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import $api from '../http/index'

export const fetchQuests = createAsyncThunk('quest/fetchQuests', async () => {
  const { data } = await $api.get('/questionnaire')
  return data
})

const initialState = {
  isLoading: true,
  quests: [],
}

export const questSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuests.pending, (state) => {
      state.isLoading = true
      state.quests = []
    })
    builder.addCase(fetchQuests.fulfilled, (state, action) => {
      state.isLoading = false
      state.quests = action.payload
    })
    builder.addCase(fetchQuests.rejected, (state) => {
      state.isLoading = true
      state.quests = []
    })
  },
})

// Action creators are generated for each case reducer function
export const {} = questSlice.actions

export default questSlice.reducer
