import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import SavedJobs from '../Screens/SavedJobs';
import CustomDrawerContent from './CustomDrawerContent';
import UpSkill from '../Screens/UpSkill';
const Drawer = createDrawerNavigator();
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FoundationIcon from 'react-native-vector-icons/Foundation';

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="DrawerHome"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#9C4A8B',
        drawerActiveTintColor: '#ffffff',
        drawerInactiveTintColor: '#121212',
        drawerStyle: {
          backgroundColor: '#e7e7e7',
        },
        drawerLabelStyle: {
          marginLeft: -10,
        },
      }}>
      <Drawer.Screen
        options={{
          title: 'Home',
          drawerIcon: (focused, color, size) => {
            return <EntypoIcon name="home" size={24} color={color} />;
          },
        }}
        name="DrawerHome"
        component={Home}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          drawerIcon: (focused, color, size) => {
            return <FeatherIcon name="user" size={24} color={'#121212'} />;
          },
        }}
      />
      <Drawer.Screen
        name="Saved Jobs"
        component={SavedJobs}
        options={{
          title: 'Saved Jobs',
          drawerIcon: (focused, color, size) => {
            return <AntDesignIcon name="heart" size={24} color={'#121212'} />;
          },
        }}
      />
      <Drawer.Screen
        name="UpSkill"
        component={UpSkill}
        options={{
          title: 'UpSkill',
          drawerIcon: (focused, color, size) => {
            return (
              <FoundationIcon
                name="social-skillshare"
                size={24}
                color={'#121212'}
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
