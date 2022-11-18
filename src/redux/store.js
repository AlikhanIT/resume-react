import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import sideSlice from './slices/sideSlice'
import questionnaireSlice from './slices/questionnaireSlice'
import taskSlice from './slices/taskSlice'

export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    sideReducer: sideSlice,
    questionnaireReducer: questionnaireSlice,
    taskReducer: taskSlice,
  },
})
