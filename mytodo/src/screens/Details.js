import React , {useState, useEffect} from 'react'
import { View, Text, Image } from 'react-native'
import { AirbnbRating } from '@rneui/themed';

function Details({ route }) {

    const { movieId } = route.params;

    const url = `https://www.omdbapi.com/?i=${movieId}&apikey=70931d4d`;
    
    
        const [data, setData] = useState(null);
        const Spacer = ({ width }) => <View style={{ width: width }} />;

        useEffect(() => {
            console.log(url);
            setTimeout(() => {
                const fetchData = () => {
                    return fetch(url)
                    .then(response => response.json())
                    .then(responseJson => setData(responseJson))
                    .catch(error => console.error('Error fetching data:', error));
                };
            
                fetchData();
              }, 500);
            
        }, [url]);

        if(data){
                return (
                    <View>
                        <View style={{
                            paddingHorizontal: 20,
                            paddingTop: 20, 
                        }}>
                            <Text style={{
                            fontSize: 30,
                            fontWeight : 'bold',
                            paddingVertical: 5,
                            }}>
                            {data.Title}</Text>
                            
                            <View style={{
                                flexDirection: 'row',
                                alignItems:'center',
                            }}>
                                <Image style={{
                                    width: '48%',
                                    height: 300,
                                    resizeMode: 'cover'
                                }}
                                    source={{
                                        uri:data.Poster,
                                    }}
                                />
                                <View style={{ 
                                    width: '44%',
                                    paddingHorizontal:2
                                }}>
                                    <Text style={{
                                        fontWeight:'bold',
                                        fontSize: 20,
                                        paddingBottom:8
                                    }}> Evaluaciones </Text>
                                    {
                                        data.Ratings.map((rating, index) => (
                                            <View style={{
                                                flexDirection: 'row',
                                            }}>
                                                <Text> {rating.Source}: </Text>
                                                <Text> {rating.Value}</Text>
                                            </View>
                                        ))
                                    }
                                    <Text style={{
                                        fontWeight:'bold',
                                        fontSize: 20,
                                        paddingVertical: 8
                                    }}> Información </Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 4
                                        }}>
                                        <Text style={{
                                        paddingVertical: 5, 
                                        }}>
                                            Idioma: </Text>
                                        <Text style={{
                                        paddingVertical: 5, 
                                        }}>
                                            {data.Language}.</Text>
                                    </View>
                                    <View style={{
                                        alignItems:'center',
                                        justifyContent: 'start',
                                        flexDirection: 'row',
                                        paddingHorizontal: 4
                                        }}>
                                            <Text style={{
                                            paddingVertical: 2, 
                                            }}>
                                            País: </Text>
                                            <Text style={{
                                            paddingVertical: 2, 
                                            }}>
                                            {data.Country}.</Text>
                                    </View>
                                    
                                    <Text style={{
                                        fontWeight:'bold',
                                        fontSize: 20,
                                        paddingVertical: 8,
                                        paddingHorizontal: 4
                                    }}>Año - Tipo</Text>
                                    
                                    <View style={{ 
                                        flexDirection: 'row', 
                                        paddingHorizontal: 4 }}>
                                        <View style={{
                                        backgroundColor:'yellow',
                                        height: 30,
                                        borderRadius: 25,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        borderWidth: 1,
                                        borderColor: 'grey',
                                        }}>
                                            <Text style={{
                                                paddingHorizontal: 10,
                                                paddingVertical:2,
                                                alignItems:'center',
                                                justifyContent:'center',
                                                fontWeight: 'bold'
                                            }}>
                                                {data.Year}
                                            </Text>
                                        </View>
                                        <Spacer width={10}/>
                                        <View style={{
                                            backgroundColor: 
                                                data.Type == 'series' ?
                                                'tomato'
                                                : data.Type == 'game' ?
                                                'orange'
                                                : '#87CEFA',
                                            
                                            height: 30,
                                            borderRadius: 25,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            borderWidth: 1,
                                            borderColor: 'grey',
                                        }}>
                                            <Text style={{
                                                paddingHorizontal: 10,
                                                paddingVertical:2,
                                                fontWeight: 'bold'
                                            }}>
                                                {data.Type}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        
                    <View style={{ 
                        paddingHorizontal: 20
                    }}>
                        <Text style={{
                                        fontWeight:'bold',
                                        fontSize: 20,
                                        paddingVertical: 8,
                                    }}>Sinopsis</Text>
                        <Text style={{
                                fontSize: 15,
                                paddingVertical: 5, 
                            }}>
                                {data.Plot}</Text>
                        <View style={{
                            width: '100%'
                            }}>
                            
                            <View style={{
                                alignItems:'center',
                                justifyContent: 'start',
                                flexDirection: 'row',
                                }}>
                                    <Text style={{
                                    fontSize: 13,
                                    paddingVertical: 2, 
                                    }}>
                                        Premios: </Text>
                                    <Text style={{
                                    fontSize: 13,
                                    paddingVertical: 2, 
                                    }}>
                                        {data.Awards}</Text>
                            </View>
                            <View style={{
                                alignItems:'center',
                                justifyContent: 'start',
                                flexDirection: 'row',
                                }}>
                                    <Text style={{
                                    fontSize: 13,
                                    paddingVertical: 2, 
                                    }}>
                                        Director: </Text>
                                    <Text style={{
                                    fontSize: 13,
                                    paddingVertical: 2, 
                                    }}>
                                        {data.Director}</Text>
                            </View>
                            <View style={{
                                alignItems:'center',
                                justifyContent: 'start',
                                flexDirection: 'row',
                                }}>
                                    <Text style={{
                                    fontSize: 13,
                                    paddingVertical: 2, 
                                    }}>
                                        Actores: </Text>
                                    <Text style={{
                                    fontSize: 13,
                                    paddingVertical: 2, 
                                    }}>
                                        {data.Actors}</Text>
                            </View>
                            <View style={{
                                alignItems:'center',
                                justifyContent: 'start',
                                flexDirection: 'row',
                                }}>
                                    <Text style={{
                                    fontSize: 13,
                                    paddingVertical: 2, 
                                    }}>
                                        Generos: </Text>
                                    <Text style={{
                                    fontSize: 13,
                                    paddingVertical: 2, 
                                    }}>
                                        {data.Genre}</Text>
                            </View>
                            <View style={{
                                alignItems:'center',
                                justifyContent: 'start',
                                flexDirection: 'row',
                                }}>
                                    <Text style={{
                                    fontSize: 13,
                                    paddingVertical: 2, 
                                    }}>
                                        Duración: </Text>
                                    <Text style={{
                                    fontSize: 13,
                                    paddingVertical: 2, 
                                    }}>
                                        {data.Runtime}</Text>
                            </View>
                        </View>
                    </View>
                    
                    </View>
                );
        }
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , padding:10 }}>
                <Text>Loading...</Text>
            </View>
        );

}

export default Details