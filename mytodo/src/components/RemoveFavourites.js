import React from 'react';
import {
View,
Text,
TouchableOpacity,
StyleSheet
} from 'react-native';
import { Icon } from '@rneui/themed';

const RemoveFavourites = (props) => {
    return (
        <View style={styles.button}>
            <Text style={styles.buttonText}>Eliminar de favoritos</Text>
            <Icon name='heart-off-outline' size={25} color='grey' type='material-community'/>
        </View>
    );
};


const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    buttonText:{
        fontSize: 14,
        color:'white',
        fontWeight: 'bold',
        paddingRight: 5
    }
    
});

export default RemoveFavourites;