import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import $api from '../http/index'

export const fetchTasks = createAsyncThunk('task/fetchTasks', async () => {
  const { data } = await $api.get('/task')
  return data
})

export const fetchTaskById = createAsyncThunk('task/fetchTaskById', async (id) => {
  const { data } = await $api.get(`/task/${id}`)
  return data
})

export const fetchCreateTask = createAsyncThunk('task/fetchCreateTask', async (params) => {
  const { data } = await $api.post('/task', params)
  return data
})

export const fetchUpdateTask = createAsyncThunk('task/fetchUpdateTask', async (params) => {
  const { data } = await $api.put(`/task/${params.id}`, params)
  return data
})

export const fetchDeleteTask = createAsyncThunk('task/fetchDeleteTask', async (id) => {
  const { data } = await $api.delete(`/task/${id}`)
  return data
})

const initialState = {
  isLoading: true,
  isError: false,
  tasks: [],
  task: {
    title: '',
    description: '',
    fileId: '',
    imageId: '',
    date_end: new Date().toDateString(),
    userIds: '',
  },
  taskUsers: JSON.parse(window.localStorage.getItem('taskUsers')),
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    deleteTaskById: (state, action) => {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.isLoading = true
      state.isError = false
      state.tasks = []
    })
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.tasks = action.payload
    })
    builder.addCase(fetchTasks.rejected, (state) => {
      state.isLoading = true
      state.isError = true
      state.tasks = []
    })

    builder.addCase(fetchDeleteTask.pending, (state) => {
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(fetchDeleteTask.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.tasks = state.tasks.filter((item) => item.id !== action.payload.id)
    })
    builder.addCase(fetchDeleteTask.rejected, (state) => {
      state.isLoading = true
      state.isError = true
    })

    builder.addCase(fetchUpdateTask.pending, (state) => {
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(fetchUpdateTask.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.tasks = state.tasks.filter((item) => item.id !== action.payload.id)
      state.tasks.push(action.payload)
    })
    builder.addCase(fetchUpdateTask.rejected, (state) => {
      state.isLoading = true
      state.isError = true
    })

    builder.addCase(fetchTaskById.fulfilled, (state, action) => {
      state.task = action.payload
    })
  },
})

// Action creators are generated for each case reducer function
export const { deleteTaskById, setUsers } = taskSlice.actions

export default taskSlice.reducer
