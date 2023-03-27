import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Motion} from '@legendapp/motion';

const Modal = ({title, setModal}) => {
  useEffect(() => {
    setTimeout(() => {
      setModal(false);
    }, 2000);
  }, []);

  return (
    <Motion.View
      className="bg-[#FF1E1E] flex-row justify-center items-center px-5 py-3 rounded-md absolute top-10 w-full"
      initial={{scale:0.9, y:-10}}
      animate={{scale: 1, y:0}}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 200,
      }}>
      <FontAwesomeIcon name="warning" size={24} color="#f3f3f3" />
      <Text className="ml-5 text-[#f3f3f3] text-base ">{title}</Text>
    </Motion.View>
  );
};

export default Modal;
