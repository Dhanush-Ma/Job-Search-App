import {View, Text} from 'react-native';
import styles from '../Utilities/globals';

const ProfileInfo = ({topText, bottomText}) => {
  return (
    <View className="mb-5 pb-1 border-customColor1 border-b-2 ">
      <Text
        style={{color: styles.color}}
        className="uppercase tracking-widest text-[16px]">
        {topText}
      </Text>
      <Text style={{color: styles.color}}>{bottomText}</Text>
    </View>
  );
};

export default ProfileInfo;
