import {View, Text, Button, TextInput} from 'react-native';
import React, {useState} from 'react';

const Navig = ({navigation, route}) => {
  const {data} = route.params;
  function goto() {
    navigation.navigate('Playground');
  }
  return (
    <View className="bg-background h-full justify-center items-center">
      <Text>Playground</Text>
      <Text className="border-2 border-customColor1 w-full p-5 mb-5">
        {data}
      </Text>
      <Button title="GO Back" onPress={goto} />
    </View>
  );
};

export default Navig;
