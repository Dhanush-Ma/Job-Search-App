import {View, Text, ImageBackground, Image, Dimensions, Linking} from 'react-native';
import {useContext} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Context} from '../Context/Context';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import logout from '../Utilities/logout';

const CustomDrawerContent = props => {
  const {user} = useContext(Context);
  const windowHeight = Dimensions.get('window').height;

  return (
    <>
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={{height: 200}}
        className="justify-end items-center pb-5">
        {user.url ? (
          <Image
            source={{uri: user.url}}
            style={{width: 80, height: 80}}
            className="rounded-full"
          />
        ) : (
          <Image
            source={require('../assets/user-img.png')}
            style={{width: 80, height: 80}}
            className="rounded-full"
          />
        )}
        <Text className="mt-2 text-bold text-xl text-[#fff]">{user.name}</Text>
      </ImageBackground>
      <DrawerContentScrollView {...props}>
        <View className=" justify-between" style={{height: windowHeight - 215}}>
          <View>
            <DrawerItemList {...props} />
          </View>

          <View>
            <DrawerItem
              label="Logout"
              onPress={() => logout(props.navigation)}
              icon={({focused, color, size}) => (
                <AntDesignIcon name="logout" size={24} color={'#121212'} />
              )}
              labelStyle={{
                marginLeft: -10,
                color: '#121212',
              }}
            />
            <DrawerItem
              icon={({focused, color, size}) => (
                <MaterialIcons
                  name="developer-mode"
                  size={24}
                  color={'#121212'}
                />
              )}
              labelStyle={{
                marginLeft: -10,
                color: '#121212',
              }}
              label="Developer"
              onPress={() =>
                Linking.openURL('https://dhansuh-mahesh.netlify.app/').catch(
                  err => console.error("Couldn't load page", err),
                )
              }
            />
          </View>
        </View>
      </DrawerContentScrollView>
    </>
  );
};

export default CustomDrawerContent;
