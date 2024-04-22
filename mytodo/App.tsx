import React ,{useState,useEffect} from 'react';
import {
View,
Text,
StyleSheet,
StatusBar,
SafeAreaView,
Stack,
} from 'react-native';
import { Avatar, Icon } from '@rneui/themed';
import AddFavorites from './src/components/AddFavorites';
import RemoveFavourites from './src/components/RemoveFavourites';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home'
import Details from './src/screens/Details'
import Favourites from './src/screens/Favourites'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'

export default function App(){

  const [favourites, setFavourites] = useState([]);

  const FavouriteStack = createNativeStackNavigator({
    screens: {
      Favoritos: Favourites,
    },
  });
  
  const HomeStack = createNativeStackNavigator({
    initialRouteName: 'Home',
    screenOptions: {
      headerStyle: { backgroundColor: 'tomato' },
    },
    screens: {
      Home: {
        screen: Home,
        options: {
          headerRight: () => (
            <View style={{ flexDirection:'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ padding: 10}}>User</Text>
              <Avatar
                size={32}
                rounded
                source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
              />
            </View>
              
          ),
        },
      },
      Detalles: Details,
    },
  });
  
  const MyTabs = createBottomTabNavigator({
    screens:{
      Inicio: {
        screen: HomeStack,
        options: {
          headerShown: false,
        },
      },
      Favoritos: {
        screen: FavouriteStack,
        options: {
          headerShown: false,
        },
      },
    },
    screenOptions: ({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let iconName;
        let color;

        if (route.name === 'Inicio') {
          iconName = focused
            ? 'home-variant'
            : 'home-variant-outline';
            color = focused
            ? 'black'
            : 'grey';
        } else if (route.name === 'Favoritos') {
          iconName = focused
          ? 'cards-heart' 
          : 'cards-heart-outline';
          color = focused
            ? 'red'
            : 'grey';
        }
        return <Icon name={iconName} size={25} color={color} type='material-community'/>;
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
    }), 
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  });

  
  const Navigation = createStaticNavigation(MyTabs);

  return (
  <Provider store= {store}>
    <SafeAreaView style={styles.container}>

    <Navigation/>
      {/* <View style={styles.search}>
        <MovieListHeading heading='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </View>
      <ScrollView horizontal={true}>
        <MovieList 
        movies = {movies} 
        handleFavouritesClick={addFavouriteMovies} 
        favoriteComponent = {AddFavorites}/>
      </ScrollView>
      <View style={styles.search}>
        <MovieListHeading heading='Favoritas'/>
      </View>
      <ScrollView horizontal={true}>
        <MovieList 
        movies = {favourites} 
        handleFavouritesClick={removeFavouriteMovies} 
        favoriteComponent = {RemoveFavourites}/>
      </ScrollView> */}
    </SafeAreaView >
  </Provider>
  
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
  container: {
    flex: 1,
  }, 
  search: {
    flexDirection: 'row',
  }
});