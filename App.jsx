import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Welcome from './Screens/Welcome';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Home from './Screens/Home';
import Profile from './Screens/Profile';
import ContextProvider from './Context/Context';
import SavedJobs from './Screens/SavedJobs';
import Job from './Screens/Job';
import DrawerNavigator from './DrawerComponents/DrawerNavigator';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={DrawerNavigator} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="SavedJobs" component={SavedJobs} />
          <Stack.Screen name="Job" component={Job} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;
