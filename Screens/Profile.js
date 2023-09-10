import {View, Text, TouchableOpacity, Image, Share} from 'react-native';
import React, {useContext} from 'react';
import {Context} from '../Context/Context';
import BackButton from '../Components/BackButton';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import logout from '../Utilities/logout';
import {AuthContext} from '../Context/AuthContext';
import styles from '../Utilities/globals';
import LinearGradient from 'react-native-linear-gradient';
import ProfileInfo from '../Components/ProfileInfo';

const Profile = ({navigation}) => {
  const {user, userDetails} = useContext(Context);
  const {setAuth} = useContext(AuthContext);

  const shareApp = () => {
    const shareOptions = {
      title: 'Title',
      message: 'Message to share', // Note that according to the documentation at least one of "message" or "url" fields is required
      url: 'www.example.com',
      subject: 'Subject',
    };
    Share.share(shareOptions);
  };

  const profileInfoDetails = {
    data: [
      {topText: 'Email', bottomText: user.email},
      {
        topText: 'Date Joined',
        bottomText: new Date(user.accountCreated).toLocaleString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      },
      // {topText: 'Email', bottomText: user.email},
      {topText: 'Location', bottomText: userDetails.country},
    ],
  };

  return (
    <View className="bg-background h-full justify-start items-center pb-10">
      <BackButton navigation={navigation} component="DrawerHome" />
      <LinearGradient
        className="pt-10 pb-5 justify-center items-center bg-customColor1 w-full mb-5 "
        colors={['#cc2b5e', '#753a88']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          transform: [{scaleX: 2}],
          borderBottomStartRadius: 300,
          borderBottomEndRadius: 300,
          overflow: 'hidden',
        }}>
        <View
          style={{
            transform: [{scaleX: 0.5}],
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {user.url ? (
            <Image
              source={{uri: user.url}}
              style={{width: 160, height: 160}}
              className="rounded-full"
            />
          ) : (
            <Image
              source={require('../assets/user-img.png')}
              style={{width: 160, height: 160}}
              className="rounded-full"
            />
          )}
          <Text
            style={{color: styles.color}}
            className="text-2xl font-bold mt-4">
            {user.name}
          </Text>
        </View>
      </LinearGradient>
      <View className="flex-row gap-10 mb-5">
        <View className="justify-center items-center">
          <Text
            style={{color: styles.color}}
            className="text-xl mb-1 text-[#ffffff]">
            {userDetails.jobsVisted}
          </Text>
          <Text
            style={{color: styles.color}}
            className="text-lg text-[#9b9b9b]">
            Jobs Visited
          </Text>
        </View>
        <View className="justify-center items-center">
          <Text
            style={{color: styles.color}}
            className="text-xl mb-1 text-[#ffffff]">
            {userDetails.savedJobs.length}
          </Text>
          <Text
            style={{color: styles.color}}
            className="text-lg text-[#9b9b9b]">
            Saved Jobs
          </Text>
        </View>
      </View>
      <View className="w-full h-80 justify-center px-12">
        {profileInfoDetails.data.map((info, idx) => (
          <ProfileInfo
            key={idx}
            topText={info.topText}
            bottomText={info.bottomText}
          />
        ))}
        <LinearGradient
          className="border-5 px-5 py-3 mt-5 mx-auto  rounded-full"
          colors={['#cc2b5e', '#753a88']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <TouchableOpacity
            className="justify-start flex-row items-center"
            onPress={() => {
              navigation.navigate('SavedJobs');
            }}>
            <Text style={{color: styles.color}} className="text-lg mr-3">
              View Saved Jobs
            </Text>
            <Ionicons name="ios-heart-outline" size={24} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View className="flex-row gap-5 mt-auto">
        <TouchableOpacity
          className="w-40 p-4 rounded-xl bg-customColor1 flex-row items-center justify-around"
          onPress={() => logout(setAuth)}>
          <Text
            style={{color: styles.color}}
            className="text-base text-center uppercase ">
            Logout
          </Text>
          <View className="rotate-180">
            <AntDesignIcon name="logout" size={24} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-40 p-4 rounded-xl bg-customColor1 flex-row items-center justify-around"
          onPress={() => shareApp()}>
          <Text
            style={{color: styles.color}}
            className="text-base text-center uppercase">
            Share App
          </Text>
          <AntDesignIcon name="sharealt" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
