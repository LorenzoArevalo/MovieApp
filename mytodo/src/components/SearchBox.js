import React from 'react';
import {
View,
Text,
TextInput,
StyleSheet,
TouchableOpacity
} from 'react-native';
import { Icon } from '@rneui/themed';

const SearchBox = (props) => {
    const clearTextInput = () => {

      this.textInput.clear()
      props.setSearchValue('')

      this.textInput.blur(); 
    };

    return (
      <View style={{ flexDirection: 'row', alignItems:'center'}}>
        <TextInput
          ref={input => { this.textInput = input }}
          style={styles.input}
          onChangeText={(text) => props.setSearchValue(text)}
          defaultValue={props.value}
          placeholder="Encuentra tu pelicula favorita..."
        />
        <TouchableOpacity activeOpacity={0.6} onPress={clearTextInput}> 
          <Icon name='backspace' size={25} color='grey' type='material-community'  />
        </TouchableOpacity>
        
      </View>
    );
};


const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

export default SearchBox