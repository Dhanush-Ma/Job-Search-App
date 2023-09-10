import {TouchableOpacity, Text, View, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../Utilities/globals';
const SkillCard = ({data, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('LearnSkill', {
          data: data,
        })
      }>
      <LinearGradient
        className="flex-row justify-center items-center w-9/12 mx-auto rounded-2xl h-24 mb-5 "
        colors={['#cc2b5e', '#753a88']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text
          style={{color: styles.color}}
          className="uppercase text-lg font-bold mr-5">
          {data.language}
        </Text>
        <Image
          resizeMode="contain"
          source={{uri: data.logo}}
          style={{width: 75, height: 75}}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SkillCard;
