import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slice/authSlice.js'
import themeReducer, { initTheme } from "./themeSlice"

export const store = configureStore({reducer: {
    auth: authReducer,
    theme: themeReducer
}})

store.dispatch(initTheme())
export default store