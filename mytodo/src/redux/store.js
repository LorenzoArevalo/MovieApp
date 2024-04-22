import { configureStore } from '@reduxjs/toolkit'
import favouritesReducer from './favouritesSlice'

export const store = configureStore({
    reducer: {
        favourites: favouritesReducer
    }
    
})