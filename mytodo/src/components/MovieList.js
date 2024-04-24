import React, { useState } from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text, Modal} from 'react-native'
import { useNavigation } from '@react-navigation/native'


const MovieList = (props) => {

    const FavouriteComponent = props.favoriteComponent;
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [dataToModal, setDataToModal] = useState({});

    const openModalWithData = (data) => {
        setDataToModal(data);
        setModalVisible(true);
      };

    const Spacer = ({ width }) => <View style={{ width: width }} />;

        return (
            <>
                {props.movies.map((movie, index)=> (
                    <View style={styles.movieContainer}>
                        <TouchableOpacity 
                        key={'touchableOpacity', index} 
                        onPress={() => navigation.navigate('Detalles', {
                        movieId: movie.imdbID
                        })} >
                            <View key={index} style={styles.container}>
                            {
                                movie.Poster == 'N/A' ? (
                                    <View
                                    style={styles.logo}
                                    >
                                        <View style={{
                                                height:'100%',
                                                width:'100%',
                                                alignItems:'center',
                                                justifyContent:'center'
                                            }}>
                                            <Text >
                                                Imagen no encontrada 
                                            </Text>
                                        </View>
                                    </View>
                                ): (
                                    <Image
                                    style={styles.logo} resizeMode={'cover'}
                                    source={{
                                        uri:movie.Poster,
                                    }}
                                />
                                )
                            }
                            
                                
                                <TouchableOpacity activeOpacity={0.6} key={movie.id} onPress={() => openModalWithData(movie)} style={styles.favoriteButton}> 
                                    <FavouriteComponent />
                                </TouchableOpacity>
                                <Modal
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => setModalVisible(false)}
                                >
                                    <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>{props.modalMessage}</Text>
                                        <Text style={styles.modalText}>{dataToModal.Title}</Text>
                                        <TouchableOpacity onPress={() => {
                                            props.handleFavouritesClick(dataToModal)
                                            setModalVisible(false)
                                        }}>
                                        <Text style={styles.closeButton}>¡Sí!</Text>
                                        </TouchableOpacity>
                                    </View>
                                    </View>
                                </Modal>
                                
                            </View>
                        </TouchableOpacity>
                        
                        <View style={styles.movieInfoContainer}>
                            <Text style={styles.movieTitle}>{movie.Title}</Text>
                            <View style={styles.cardsContainer}>
                                <View style={styles.yearCardContainer}>
                                    <Text style={styles.cardText}>
                                        {movie.Year}
                                    </Text>
                                </View>
                                
                                <Spacer width={10}/>
                                <View style={{
                                    backgroundColor: 
                                        movie.Type == 'series' ?
                                        'tomato'
                                        : movie.Type == 'game' ?
                                        'orange'
                                        : '#87CEFA',
                                    
                                    height: 30,
                                    borderRadius: 25,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    borderWidth: 1,
                                    borderColor: 'grey',
                                }}>
                                    <Text style={styles.cardText}>
                                        {movie.Type}
                                    </Text>
                                </View>
                                
                            </View>

                        </View>
                        
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
    movieContainer: {
        width: '50%',
        paddingHorizontal: 4,
    },
    container: {
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        alignItems: 'center', 
        borderWidth: 1,
        borderColor: 'grey',
    },
    movieInfoContainer: { 
        flex: 1, 
        alignItems:'center', 
        justifyContent:'start', 
        paddingVertical: 10,
    },
    cardsContainer: { 
        flexDirection:'row',
        paddingVertical: 5,
    },
    yearCardContainer: {
        backgroundColor:'yellow',
        height: 30,
        borderRadius: 25,
        alignItems:'center',
        justifyContent:'center',
        borderWidth: 1,
        borderColor: 'grey',
    },
    cardText: {
        paddingHorizontal: 10,
        paddingVertical:2,
        alignItems:'center',
        justifyContent:'center',
        fontWeight: 'bold'
    },
    movieTitle: {
        fontWeight: 'bold', 
        textAlign:'center'
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
    openButton: {
    fontSize: 18,
    color: 'blue',
    marginBottom: 20,
    },
    centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', 
    },
    modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    },
    modalText: {
    fontSize: 18,
    marginBottom: 20,
    },
    closeButton: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
    },
  });

export default MovieList;
