import {View} from 'react-native';
import React from 'react';
import {MotiView} from 'moti';

const from = {opacity: 0};
const animate = {opacity: 1};
const transition = {loop: true, type: 'timing', duration: 500};

const elements = [...Array(3).keys()].map(index => {
  return (
    <MotiView
      key={index}
      className="w-full h-44 rounded-xl p-5 mb-5  justify-between bg-[#6f6e6e]">
      <View className="flex-row gap-3 items-center justify-start ">
        <MotiView
          from={from}
          animate={animate}
          transition={transition}
          style={{width: 50, height: 50}}
          className="bg-[#3b3b3b] rounded-full z-10"></MotiView>
        <View>
          <MotiView
            from={from}
            animate={animate}
            transition={transition}
            className="bg-[#3b3b3b] w-56 h-6 rounded-full mb-3"></MotiView>
          <MotiView
            from={from}
            animate={animate}
            transition={transition}
            className="bg-[#3b3b3b] w-32 h-6 rounded-full"></MotiView>
        </View>
      </View>
      <View className="flex-row justify-between mt-5">
        <MotiView
          from={from}
          animate={animate}
          transition={transition}
          className="bg-[#3b3b3b] w-32 h-6 rounded-full"></MotiView>
        <MotiView
          from={from}
          animate={animate}
          transition={transition}
          style={{width: 35, height: 35}}
          className="bg-[#3b3b3b] rounded-full"></MotiView>
      </View>
    </MotiView>
  );
});

const JobsSkeleton = () => {
  return <>{elements}</>;
};

export default JobsSkeleton;
