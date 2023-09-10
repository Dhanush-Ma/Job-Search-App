import {View, Text, Button, TextInput} from 'react-native';
import React, {useState} from 'react';


const Playground = ({navigation}) => {
  const [query, setquery] = useState('');
  function goto() {
    navigation.navigate('Navig', {
      data: query
    });
  }

  return (
    <View className="bg-background h-full justify-center items-center">
      <Text>Playground</Text>
      <View className="border-3 w-full  border-customColor2">
        <TextInput className="w-full" onChangeText={(text)=>setquery(text)} value={query} />
      </View>
      <Text className="border-2 border-customColor1 w-full p-5 mb-5">
        {query}
      </Text>
      <Button title="GO TO NEXT" onPress={goto} />
    </View>
  );
};

export default Playground;
