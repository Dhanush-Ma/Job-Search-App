import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {Context} from '../Context/Context';
import getCurrentUser from '../Utilities/getCurrentUser';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import JobsList from '../Components/JobsList';
import firestore from '@react-native-firebase/firestore';
import UserSnapshot from '../Utilities/UserSnapshot';

const Home = ({navigation}) => {
  const {user, setUser, setUserDetails} = useContext(Context);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [queryResult, setQueryResult] = useState({});
  const [queryError, setQueryError] = useState(false);

  const getQueryResults = () => {
    Keyboard.dismiss();
    console.log(query);
    if (!query) return;
    setLoading(true);
    const url = `https://jsearch.p.rapidapi.com/search?query=${query}%20in%20India`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '1ddbff9a25msh6d1877de040f70cp10d28fjsn6f6aa0fc787d',
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setQueryResult(data);
        console.log(data);
      })
      .catch(error => {
        setLoading(false);
        setQueryError(true);
        console.error(error);
      });
  };

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    const createUser = () => {
      const userRef = firestore().collection('Users').doc(user.id);
      userRef.get().then(docSnapshot => {
        if (docSnapshot.exists) {
        } else {
          userRef.set({
            id: user.id,
            name: user.name,
            savedJobs: [],
            jobsVisted: 0,
          });
        }
      });
    };

    if (user.id) {
      createUser();
    }
  }, [user]);

  return (
    <View className="bg-background w-full h-full p-5 pb-0">
      <UserSnapshot userId={user.id} />
      <View className="flex-row items-center justify-between">
        <AntDesignIcon name="menu-fold" size={32} onPress={() => {navigation.openDrawer()}} />
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View className="w-4 h-4 rounded-full bg-[#0aff0a] absolute z-10 right-0 -top-1"></View>

          {user.url ? (
            <Image
              source={{uri: user.url}}
              style={{width: 50, height: 50}}
              className="rounded-full"
            />
          ) : (
            <Image
              source={{
                uri: 'https://cdn.vectorstock.com/i/1000x1000/45/59/profile-photo-placeholder-icon-design-in-gray-vector-37114559.webp',
              }}
              style={{width: 50, height: 50}}
              className="rounded-full"
            />
          )}
        </TouchableOpacity>
      </View>
      <Text className="text-3xl my-5">
        Hello, {user.name && user.name.split(' ')[0]} 👋
      </Text>
      <View className="bg-[#9e9e9e] flex-row justify-start items-center rounded-full">
        <TextInput
          className="pl-3 placeholder:text-[#e7e7e7]  w-[85%]"
          placeholder="Search for roles, jobs and much more...."
          onChangeText={text => setQuery(text)}
          value={query}
          keyboardType="web-search"
          returnKeyType="search"
          onSubmitEditing={getQueryResults}
        />
        <TouchableOpacity className="mx-auto" onPress={getQueryResults}>
          <AntDesignIcon name="search1" size={28} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View className="justify-center m-auto">
          <ActivityIndicator size="large" color="#9C4A8B" />
        </View>
      ) : queryError ? (
        <View className="justify-center m-auto">
          <Text>Some Error Occured!</Text>
        </View>
      ) : queryResult ? (
        <>
          <Text className="font-bold text-lg mt-5 mb-3">
            Showing results for{' '}
            <Text className="italic font-bold">"{query}"</Text>
          </Text>
          <JobsList navigation={navigation} data={queryResult} />
        </>
      ) : null}
    </View>
  );
};

export default Home;
