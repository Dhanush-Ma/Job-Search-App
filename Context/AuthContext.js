import React, {createContext, useState, useEffect} from 'react';
export const AuthContext = createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContextProvider = props => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      try {
        const authInfoSerialized = await AsyncStorage.getItem('AuthInfo');
        if (JSON.parse(authInfoSerialized) === true) {
          setLoading(false);

          setAuth(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
