import React from 'react';
import {
View,
Text,
TextInput,
StyleSheet,
TouchableOpacity
} from 'react-native';
import { Icon } from '@rneui/themed';
import  colors  from '../styles/colors'

const SearchBox = (props) => {
    const clearTextInput = () => {

      this.textInput.clear()
      props.setSearchValue('')
      props.setPagSeleccionada(1)
      props.setMovies([])
      this.textInput.blur(); 
    };

    return (
      <View style={styles.container}>
        <TextInput
          ref={input => { this.textInput = input }}
          style={styles.input}
          onChangeText={(text) => props.setSearchValue(text)}
          defaultValue={props.value}
          placeholderTextColor="grey"
          placeholder="Encuentra tu pelicula favorita..."
        />
        <TouchableOpacity activeOpacity={0.6} onPress={clearTextInput}> 
          <Icon name='backspace' size={25} color={colors.lightGreen}  type='material-community'  />
        </TouchableOpacity>
        
      </View>
    );
};


const styles = StyleSheet.create({
    container: { 
      flexDirection: 'row',
      alignItems:'center'
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: colors.lightGreen,
      color: colors.lightGreen,
    },
  });

export default SearchBox