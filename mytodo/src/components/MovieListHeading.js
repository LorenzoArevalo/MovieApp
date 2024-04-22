import React from 'react';
import {
View,
Text,
StyleSheet
} from 'react-native';

const MovieListHeading = (props) => {
    return (
        <View>
            <Text style={styles.titleText}>{props.heading}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

export default MovieListHeading