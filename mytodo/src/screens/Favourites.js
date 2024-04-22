import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import MovieList from '../components/MovieList'
import RemoveFavourites from '../components/RemoveFavourites'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { setFavourites } from '../redux/favouritesSlice'

function Favourites() {

    const navigation = useNavigation();
    const favourites = useSelector((state) => state.favourites);


    const removeFavouriteMovies = (movie) => {
        const newFavouriteList = favourites.filter(
          (favourite) => favourite.imdbID !== movie.imdbID
        );
        dispatch(setFavourites({newFavouriteList}))
      }

    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ScrollView style={{ padding: 10 }} 
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps= {'always'}>
            <View style={styles.container}>
                <MovieList 
                movies = {favourites.movies} 
                handleFavouritesClick={removeFavouriteMovies} 
                favoriteComponent = {RemoveFavourites}/>
            </View>
        </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignContent: 'flex-start'
    },
    itemContainer: {
      width: '50%',
    },
    item: {
      padding: '8px',
      margin: '8px',
      backgroundColor: '#EEEEEE',
      height: "calc(100% - 8px)"
    }
  })

export default Favourites