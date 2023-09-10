import auth from '@react-native-firebase/auth';
import {useContext} from 'react';
import {AuthContext} from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logout = async setAuth => {
  try {
    try {
      await auth().signOut();
      setAuth(false);
      await AsyncStorage.removeItem('AuthInfo');
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export default logout;
