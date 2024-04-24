import React from 'react';
import {
View,
Text,
StyleSheet
} from 'react-native';
import  colors  from '../styles/colors'

const MovieListHeading = (props) => {
    return (
        <View>
            <Text style={styles.titleText}>{props.heading}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    titleText: {
      color: colors.lightGreen,
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

export default MovieListHeading