import {NavigationContainer} from '@react-navigation/native';
import {useContext} from 'react';
import {AuthContext} from './Context/AuthContext';
import Loading from './Screens/Loading';
import AuthStack from './Stack/AuthStack';
import UserStack from './Stack/UserStack';

const Router = () => {
  const {auth, loading} = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {auth ? <UserStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
