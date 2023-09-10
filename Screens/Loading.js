import {Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

const Loading = () => {
  return (
    <LinearGradient
      className="h-full w-full justify-center items-center"
      colors={['#cc2b5e', '#753a88']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <Image
        source={require('../assets/logo-job-quest.png')}
        style={{height: 400, width: 400}}
        resizeMode="contain"
      />
    </LinearGradient>
  );
};

export default Loading;
