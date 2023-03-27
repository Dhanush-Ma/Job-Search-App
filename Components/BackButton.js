import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
const BackButton = ({navigation, component}) => {
  return (
    <TouchableOpacity
      className="absolute z-10 left-3 top-5 bg-[#121212] p-2 flex-1 justify-center items-center rounded-full"
      onPress={() => navigation.push(component)}>
      <Ionicons name="chevron-back" color="#fff" size={24} />
    </TouchableOpacity>
  );
};

export default BackButton;
