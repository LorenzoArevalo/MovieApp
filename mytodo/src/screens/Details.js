import React , {useState, useEffect} from 'react'
import { View, Text, Image} from 'react-native'

function Details({ route }) {

    const { movieId } = route.params;

    const url = `http://www.omdbapi.com/?i=${movieId}&apikey=70931d4d`;
    
    
        const [data, setData] = useState(null);

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
                        <Image style={{
                            marginRight: 10,
                            width: 200,
                            height: 300,
                        }}
                            source={{
                                uri:data.Poster,
                            }}
                        />
                    <Text>{data.Title}</Text>
                    <Text>{data.Plot}</Text>
                    <Text>{data.Language}</Text>
                    <Text>{data.Country}</Text>
                    <Text>{data.Awards}</Text>
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