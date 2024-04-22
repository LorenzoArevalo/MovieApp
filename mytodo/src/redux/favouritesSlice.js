import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    movies: []
}

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        setFavourites: (state, action) => {
            const  movies = action.payload.newFavouriteList;
            state.movies = movies;
        }
    }
})

export const { setFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;