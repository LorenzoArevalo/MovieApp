import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import MovieListHeading from '../components/MovieListHeading'
import SearchBox from '../components/SearchBox'
import MovieList from '../components/MovieList';
import AddFavorites from '../components/AddFavorites'
import { useSelector, useDispatch } from 'react-redux'
import { setFavourites } from '../redux/favouritesSlice'

function Home() {

    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    const favourites = useSelector((state) => state.favourites);
    
    const getMoviesRequest = async (searchValue) => {
    
    console.log(searchValue);
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=70931d4d`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search){
        setMovies(responseJson.Search);
      }
    
  };

  
  const addFavouriteMovies = (movie) => {
    console.log('store favorites: ',favourites);
    if (!favourites.movies.includes(movie)) {
      const newFavouriteList = [...favourites.movies, movie];
      dispatch(setFavourites({newFavouriteList}));
      console.log('Favorite',favourites.movies);
    }
    
  }

  useEffect(() =>
  {
    getMoviesRequest(searchValue);
  }, [searchValue]);

  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'start' , padding:10 }}>
      <MovieListHeading heading='Buscar' />
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      <ScrollView style={{ padding: 10 }} 
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps= {'always'}>
            <View style={styles.container}>
                {
                    searchValue == '' 
                    ? (
                        <View style={{
                        alignContent:'center', 
                        justifyContent: 'center', 
                        height:500
                        }}>
                            <Text>No hay resultados...</Text>
                        </View>
                    )
                    : (
                        <MovieList 
                        movies = {movies} 
                        handleFavouritesClick={addFavouriteMovies} 
                        favoriteComponent = {AddFavorites}
                        searchValue = {searchValue}
                        />
                    )
                }
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

export default Home