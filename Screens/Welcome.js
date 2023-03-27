import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  Image,
} from 'react-native';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode';
import getCurrentUser from '../Utilities/getCurrentUser';

const Welcome = ({navigation}) => {
  const darkMode = useColorScheme();
  useEffect(() => {
    if(getCurrentUser()){
      navigation.navigate("Home")
    }
  }, [])
  
  return (
    <View className="bg-background h-full p-14 flex-1 justify-between gap-10 align-middle">
      <View className="h-1/2 justify-center align-middle">
        <Image
          source={{
            uri: 'https://www.ivertech.com/Articles/Images/KoalaBear200x200.jpg',
          }}
          style={{height: 300, width: 300}}
          resizeMode={ImageResizeMode.contain}
          className="rounded-full"
        />
      </View>
      <View className="h-1/2">
        <Text className="font-bold text-3xl text-center">
          Hey There! Welcome!
        </Text>
        <Text className="text-center mb-5">
          Explore Jobs, Internships and much more...
        </Text>
        <View className="flex-1 mx-auto w-52">
          <TouchableOpacity
            className="my-5 bg-customColor1 py-4 rounded-full w-52"
            onPress={() => navigation.navigate('Register')}>
            <Text className="text-center font-bold text-xl">Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-customColor2 py-4 rounded-full  w-52"
            onPress={() => navigation.navigate('Login')}>
            <Text className="text-center font-bold text-xl">
              I have an Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
