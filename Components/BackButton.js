import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
const BackButton = ({navigation, component, colorSpecify}) => {
  return (
    <TouchableOpacity
      className={`absolute z-10 left-3 top-5 p-2 flex-1 justify-center items-center rounded-full ${
        colorSpecify ? 'bg-customColor3' : 'bg-[#121212]'
      }`}
      onPress={() => {
        return navigation.navigate(component);
      }}>
      <Ionicons name="chevron-back" color={`${colorSpecify ? "#000" : "#fff"}`} size={24} />
    </TouchableOpacity>
  );
};

export default BackButton;
