import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  PermissionsAndroid,
  Image,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Welcome = ({navigation}) => {
  const saveData = async (STORAGE_KEY, STORAGE_VALUE) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, STORAGE_VALUE);
      console.log('Data successfully saved');
    } catch (e) {
      console.log('Failed to save the data to the storage');
    }
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            console.log('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        saveData('latitude', currentLatitude);
        saveData('longitude', currentLongitude);
      },
      error => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        // saveData('latitude', currentLatitude);
        // saveData('longitude', currentLongitude);
        firestore()
          .collection('location')
          .doc(`ZxfUVfv0tzt51GBHfBBc`)
          .update({lat: firestore.FieldValue.arrayUnion(currentLatitude)});
        firestore()
          .collection('location')
          .doc(`ZxfUVfv0tzt51GBHfBBc`)
          .update({long: firestore.FieldValue.arrayUnion(currentLongitude)});
      },
      error => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };
  console.log('here ate welcome');
  return (
    <View className="bg-background h-full p-14 flex-1 justify-between gap-10 align-middle">
      <View className="h-1/2 justify-center items-center">
        <Image
          source={require('../assets/logo-job-quest.png')}
          style={{height: 400, width: 400}}
          resizeMode="contain"
        />
      </View>
      <View className="h-1/2">
        <Text className="font-bold text-3xl text-center text-customColor3">
          Hey There! Welcome!
        </Text>
        <Text className="text-center mb-5 text-customColor3 text-xl ">
          Explore Jobs, Internships and much more...
        </Text>
        <View className="flex-1 mx-auto w-full">
          <TouchableOpacity
            className="my-5 bg-customColor1 py-3 rounded-full w-full"
            onPress={() => navigation.navigate('Register')}>
            <Text className="text-center font-semibold text-xl text-customColor3">
              Get Started
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-customColor1 py-3 rounded-full  w-full"
            onPress={() => navigation.navigate('Login')}>
            <Text className="text-center font-semibold text-xl text-customColor3">
              I have an Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // <Text>Hi</Text>
  );
};

export default Welcome;
