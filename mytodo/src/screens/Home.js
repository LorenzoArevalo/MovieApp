import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
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
    const [paginas, setPaginas] = useState([]);
    const [pagSeleccionada, setPagSeleccionada] = useState(1);
    const resultadosPorPagina = 10;
    
    const getMoviesRequest = (searchValue, pagSeleccionada) => {
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=70931d4d&page=${pagSeleccionada}`;
    
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson && responseJson.Search) {
            setMovies(responseJson.Search);
            
            const totalResults = parseInt(responseJson.totalResults);
            const numeroPaginas = Math.ceil(totalResults / resultadosPorPagina);
    
            setPaginas(Array.from({ length: numeroPaginas }, (_, index) => index + 1));
            
            console.log('totalResults: ', totalResults);
            console.log('resultadosPorPagina: ', resultadosPorPagina);
            console.log('paginas: ', paginas);
          } else {
            console.log('No se encontraron resultados');
          }
        })
        .catch((error) => {
          console.error('Error al obtener películas:', error);
        });
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
    getMoviesRequest(searchValue, pagSeleccionada);
  }, [
    searchValue,
    pagSeleccionada
  ]);

  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'start' , padding:10 }}>
      <MovieListHeading heading='Buscar' />
      <SearchBox 
        searchValue={searchValue} 
        setSearchValue={setSearchValue} 
        setPagSeleccionada={setPagSeleccionada}
        setMovies={setMovies}
      />
      {
          searchValue == '' 
          ? (
            <View></View>
          )
          : (
            <View style={{
              alignContent:'center',
              justifyContent:'center'
            }}>
              <View style={{
                flexDirection:'row',
                maxWidth: '60%'
              }}>
                <TouchableOpacity onPress={()=> pagSeleccionada > 1 
                  ? setPagSeleccionada(pagSeleccionada - 1) 
                  : setPagSeleccionada(pagSeleccionada)}>
                  <Icon style={{ paddingHorizontal: 5 }} 
                  name='arrow-left-thin' size={20} 
                  color='black' 
                  type='material-community'/>
                </TouchableOpacity>
                
                <ScrollView style={{ height:30 }} 
                          showsVerticalScrollIndicator={false}
                          keyboardShouldPersistTaps= {'always'}
                          horizontal>
                  {
                    paginas.map((pagina, index) => {
                      const color = pagina === pagSeleccionada ? 'tomato': 'grey'
                      if (index < 1) {
                        return (
                          <TouchableOpacity key={'touchableOpacity',index} onPress={()=> setPagSeleccionada(index + 1)}>
                            <Text style={{ 
                            fontWeight: 'bold', 
                            color
                            }}>
                            {pagina}
                            </Text>
                          </TouchableOpacity>
                          
                        );
                      } else {
                        return (
                          <View style={{ flexDirection: 'row'}}>
                            <Text> - </Text>
                            <TouchableOpacity onPress={()=> setPagSeleccionada(index + 1)}>
                              <Text style={{ 
                                fontWeight: 'bold',
                                color
                                }}>
                                {pagina}
                              </Text>
                            </TouchableOpacity>
                          </View>
                          
                        );
                      }
                      
                    }
                    )
                  }
                </ScrollView>
                <TouchableOpacity onPress={()=> pagSeleccionada < paginas.length 
                  ? setPagSeleccionada(pagSeleccionada + 1) 
                  : setPagSeleccionada(pagSeleccionada)}>
                  <Icon style={{ paddingHorizontal: 5 }} 
                  name='arrow-right-thin' 
                  size={20} color='black' 
                  type='material-community'/>
                </TouchableOpacity>
                
              </View>
            </View>
          )
        }
      
      <ScrollView style={{ padding: 10, width:'100%' }} 
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps= {'always'}>
            <View style={styles.container}>
                {
                    searchValue == '' 
                    ? (
                        <View style={{
                        alignContent:'center', 
                        justifyContent: 'center', 
                        width:'100%',
                        height:500,
                        }}>
                            <Text style={{
                              textAlign:'center'
                            }}>¡Busca tu pelicula o serie favorita! ☝️😎</Text>
                        </View>
                    )
                    : (
                        <MovieList
                        modalMessage={'¿Quieres agregar esta película a favoritos? 💔'} 
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
      alignContent: 'flex-start',
      width:'100'
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