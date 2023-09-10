import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import data from '../Screens/data';
import React, {useState, useContext, useEffect} from 'react';
import {Context} from '../Context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import getCurrentUser from '../Utilities/getCurrentUser';
import UserSnapshot from '../Utilities/UserSnapshot';
import {getUserplace} from '../Utilities/getPlace';
import GradientText from '../Utilities/GradientText';
import styles from '../Utilities/globals';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import JobsList from '../Components/JobsList';
import JobsSkeleton from '../Components/JobsSkeleton';
import Pagination from '../Components/Pagination';

const Home = ({navigation}) => {
  const {user, setUser, userDetails, flatListRef} = useContext(Context);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [queryResult, setQueryResult] = useState(null);
  // const [queryResult, setQueryResult] = useState(null);

  const [queryError, setQueryError] = useState(false);
  const [userLocation, setuserLocation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);

  let currentSetOfJobs = [];

  const getQueryResults = () => {
    Keyboard.dismiss();
    if (!query) return;
    setLoading(true);
    setQueryResult(null);
    const url = `https://jsearch.p.rapidapi.com/search?query=${query}%20in%20${
      userDetails.country.split(',')[1]
    }&num_pages=5`;

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
      })
      .catch(error => {
        setLoading(false);
        setQueryError(true);
        console.error(error);
      });
  };

  const readData = async () => {
    try {
      const lat = await AsyncStorage.getItem('latitude');
      const long = await AsyncStorage.getItem('longitude');
      const response = await getUserplace(lat, long);
      setuserLocation({place: response.place, code: response.code});
    } catch (e) {
      console.log('here', e);
    }
  };

  useEffect(() => {
    const setup = async () => {
      await readData();
      setUser(getCurrentUser());
      const authInfoSerialized = await AsyncStorage.getItem('AuthInfo');
      if (JSON.stringify(authInfoSerialized) === 'null') {
        await AsyncStorage.setItem('AuthInfo', 'true');
      }
    };

    setup();
  }, []);

  useEffect(() => {
    const createUser = () => {
      const userRef = firestore().collection('Users').doc(user.id);

      userRef
        .get()
        .then(docSnapshot => {
          if (docSnapshot.exists) {
          } else {
            userRef.set({
              id: user.id,
              name: user.name,
              savedJobs: [],
              jobsVisted: 0,
              country: userLocation.place,
              countrycode: userLocation.code,
            });
          }
        })
        .catch(e => console.log('error this fd', e));
    };

    if (user.id) {
      createUser();
    }
  }, [user]);

  const paginate = number => {
    console.log(number);
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
    setCurrentPage(number);
  };

  if (queryResult) console.log(queryResult.data.length);

  if (queryResult) {
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    currentSetOfJobs = queryResult.data.slice(indexOfFirstJob, indexOfLastJob);
  }

  return (
    <>
      <View className="bg-background w-full h-full p-5 pb-0">
        {user.name && (
          <>
            <UserSnapshot userId={user.id} />
            <View className="flex-row items-center justify-between pb-2">
              <AntDesignIcon
                name="menu-fold"
                size={32}
                color="#fff"
                onPress={() => {
                  navigation.openDrawer();
                }}
              />
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
                    source={require('../assets/user-img.png')}
                    style={{width: 50, height: 50}}
                    className="rounded-full"
                  />
                )}
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center mb-3">
              <Text
                className="text-3xl"
                style={{color: styles.color, fontFamily: ''}}>
                Hello,{' '}
              </Text>
              <GradientText
                className="text-3xl "
                colors={['#dd2bdd', '#ec80d6']}>
                {user.name && user.name.split(' ')[0]}
              </GradientText>
              <Text className="text-3xl"> 👋</Text>
            </View>
            <>
              <View className="border-customColor1 border-2 flex-row justify-start items-center rounded-full mb-3">
                <TextInput
                  className="pl-3 placeholder:text-[#e7e7e7]  w-[85%]"
                  placeholderTextColor="#fff"
                  placeholder="Search for roles, jobs and much more...."
                  onChangeText={text => setQuery(text)}
                  value={query}
                  keyboardType="web-search"
                  returnKeyType="search"
                  onSubmitEditing={getQueryResults}
                />
                <TouchableOpacity className="mx-auto" onPress={getQueryResults}>
                  <AntDesignIcon name="search1" size={28} color="#fff" />
                </TouchableOpacity>
              </View>
              {loading ? (
                <View className="my-auto">
                  <JobsSkeleton />
                </View>
              ) : queryError ? (
                <View className="justify-center m-auto">
                  <Text>Some Error Occured!</Text>
                </View>
              ) : queryResult ? (
                queryResult.data.length > 0 ? (
                  <>
                    <JobsList
                      navigation={navigation}
                      data={currentSetOfJobs}
                      query={query}
                    />
                  </>
                ) : (
                  <View className="justify-center items-center m-auto">
                    <Image
                      source={require('../assets/nodata.png')}
                      style={{height: 400, width: 350}}
                      resizeMode="contain"
                    />
                  </View>
                )
              ) : (
                <View className="justify-center items-center m-auto">
                  <Image
                    source={require('../assets/search.png')}
                    style={{height: 400, width: 350}}
                    resizeMode="contain"
                  />
                </View>
              )}
            </>
            {queryResult && queryResult.data.length > jobsPerPage && (
              <View className="py-3  items-center">
                <Pagination
                  className="w-full"
                  jobsPerPage={jobsPerPage}
                  totalJobs={queryResult.data.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </View>
            )}
          </>
        )}
      </View>
    </>
  );
};

export default Home;
