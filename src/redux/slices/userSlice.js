import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import $api from '../http/index'

export const fetchLogin = createAsyncThunk('users/fetchLogin', async (params) => {
  const { data } = await $api.post('/user/login', params)
  return data
})

export const fetchRegister = createAsyncThunk('users/fetchRegister', async (params) => {
  const { data } = await $api.post('/user/register', params)
  return data
})

export const fetchUpdateUser = createAsyncThunk('users/fetchUpdateUser', async (params) => {
  const { data } = await $api.put(`/user/${params.id}`, params)
  return data
})

export const fetchLogout = createAsyncThunk('users/fetchLogout', async () => {
  const { data } = await $api.get('/user/logout')
  return data
})

export const fetchRefresh = createAsyncThunk('users/fetchRefresh', async () => {
  const { data } = await $api.get('/user/refresh')
  return data
})

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (params) => {
  const { data } = await $api.get('/user/getall')
  return data
})

export const fetchUser = createAsyncThunk('users/fetchUser', async (id) => {
  const { data } = await $api.get(`/user/getby/${id}`)
  return data
})

const initialState = {
  isLogged: false,
  isError: false,
  userinfo: {},
  users: [],
  user: {},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.isLogged = false
      state.isError = false
      state.userInfo = {}
      localStorage.removeItem('accessToken')
    })
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.isLogged = true
      state.isError = false
      state.userInfo = action.payload
      localStorage.setItem('accessToken', action.payload.accessToken)
    })
    builder.addCase(fetchLogin.rejected, (state) => {
      state.isLogged = false
      state.isError = true
      state.userInfo = {}
      localStorage.removeItem('accessToken')
    })

    builder.addCase(fetchRegister.pending, (state) => {
      state.isLogged = false
      state.isError = false
      state.userInfo = {}
      localStorage.removeItem('accessToken')
    })
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.isLogged = true
      state.isError = false
      state.userInfo = action.payload
      localStorage.setItem('accessToken', action.payload.accessToken)
    })

    builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
      state.userInfo = action.payload
    })

    builder.addCase(fetchRegister.rejected, (state) => {
      state.isLogged = false
      state.isError = true
      state.userInfo = {}
      localStorage.removeItem('accessToken')
    })

    builder.addCase(fetchRefresh.fulfilled, (state, action) => {
      state.isLogged = true
      state.userInfo = action.payload
      localStorage.setItem('accessToken', action.payload.accessToken)
    })
    builder.addCase(fetchRefresh.rejected, (state) => {
      state.isLogged = false
      state.userInfo = {}
      localStorage.removeItem('accessToken')
    })

    builder.addCase(fetchLogout.pending, (state) => {
      state.isLogged = false
    })
    builder.addCase(fetchLogout.fulfilled, (state) => {
      state.isLogged = false
      localStorage.removeItem('accessToken')
    })
    builder.addCase(fetchLogout.rejected, (state) => {
      state.isLogged = true
    })

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload
    })

    builder.addCase(fetchUser.pending, (state) => {
      state.user = {}
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(fetchUser.rejected, (state) => {
      state.user = {}
    })
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer
