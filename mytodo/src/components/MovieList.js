import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native'
import { useNavigation } from '@react-navigation/native'


const MovieList = (props) => {

    const FavouriteComponent = props.favoriteComponent;
    const navigation = useNavigation();


        return (
            <>
                {props.movies.map((movie, index)=> (
                    <View style={{
                        width: '50%',
                        height: 340,
                        paddingHorizontal: 4,
                        }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Detalles', {
                        movieId: movie.imdbID
                        })} >
                            <View key={index} style={styles.container}>
                                <Image
                                    style={styles.logo} resizeMode={'cover'}
                                    source={{
                                        uri:movie.Poster,
                                    }}
                                />
                                <TouchableOpacity activeOpacity={0.6} key={movie.id} onPress={() => props.handleFavouritesClick(movie)} style={styles.favoriteButton}> 
                                    <FavouriteComponent />
                                </TouchableOpacity>
                                
                            </View>
                        </TouchableOpacity>
                        <Text style={{fontWeight: 'bold'}}>{movie.Title}</Text>
                    </View>
                    
                ))}
            </>
        );
    
};

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 300,
        
    },
    container: {
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        alignItems: 'center', 
        
    },
    favoriteButton: {
        position: 'absolute',
        left:0,
        right: 0,
        top: 250,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
  });

export default MovieList;
