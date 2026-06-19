import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null
  },
  reducers: {
    setSession: (state, action) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
    },
    clearSession: (state) => {
      state.user = null
      state.accessToken = null
    }
  }
})

export const { setSession, clearSession } = authSlice.actions
export default authSlice.reducer
