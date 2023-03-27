import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useContext} from 'react';
import {Context} from '../Context/Context';
import BackButton from '../Components/BackButton';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import logout from '../Utilities/logout';

const Profile = ({navigation}) => {
  const {user, userDetails} = useContext(Context);

  const shareApp = () => {};
  
  return (
    <View className="bg-background h-full justify-start items-center pb-10">
      <BackButton navigation={navigation} component="Home" />
      <View
        className="pt-10 pb-5 justify-center items-center bg-customColor1 w-full mb-5 "
        style={{
          transform: [{scaleX: 2}],
          borderBottomStartRadius: 300,
          borderBottomEndRadius: 300,
          overflow: 'hidden',
        }}>
        <View
          className=""
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
              source={require("../assets/user-img.png")}
              style={{width: 160, height: 160}}
              className="rounded-full"
            />
          )}
          <Text className="text-2xl mt-4">{user.name}</Text>
        </View>
      </View>
      <View className="flex-row gap-10 mb-5">
        <View className="justify-center items-center">
          <Text className="text-xl mb-1 text-[#ffffff]">{userDetails.jobsVisted}</Text>
          <Text className="text-lg text-[#9b9b9b]">Jobs Visited</Text>
        </View>
        <View className="justify-center items-center">
          <Text className="text-xl mb-1 text-[#ffffff]">
            {userDetails.savedJobs.length}
          </Text>
          <Text className="text-lg text-[#9b9b9b]">Saved Jobs</Text>
        </View>
      </View>
      <View className="w-full h-80 justify-center px-12">
        <View className="mb-5">
          <Text className="uppercase tracking-widest text-[16px]">
            Email Address
          </Text>
          <Text>{user.email}</Text>
        </View>
        <View className="mb-5">
          <Text className="uppercase tracking-widest text-[16px]">
            Location
          </Text>
          <Text>India</Text>
        </View>
        <View className="mb-5">
          <Text className="uppercase tracking-widest text-[16px]">
            Date Joined
          </Text>
          <Text>
            {new Date(user.accountCreated).toLocaleString('en-us', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        </View>
        <View className="">
          <Text className="uppercase tracking-widest text-[16px]">
            Date Joined
          </Text>
          <Text>
            {new Date(user.accountCreated).toLocaleString('en-us', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        </View>
        <TouchableOpacity
          className="justify-start flex-row items-center border-5 px-5 py-2 mx-auto mt-8 rounded-full border-2 border-customColor1"
          onPress={() => {
            navigation.navigate('SavedJobs');
          }}>
          <Text className="text-lg mr-3">View Saved Jobs</Text>
          <Ionicons name="ios-heart-outline" size={24} />
        </TouchableOpacity>
      </View>
      <View className="flex-row gap-5 mt-auto">
        <TouchableOpacity
          className="w-40 p-4 rounded-xl bg-customColor1 flex-row items-center justify-around"
          onPress={() => logout(navigation)}>
          <Text className="text-base text-center uppercase ">Logout</Text>
          <View className="rotate-180">
            <AntDesignIcon name="logout" size={24} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-40 p-4 rounded-xl bg-customColor1 flex-row items-center justify-around"
          onPress={() => shareApp()}>
          <Text className="text-base text-center uppercase">Share App</Text>
          <AntDesignIcon name="sharealt" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
