import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import {useState, useContext, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButton from '../Components/BackButton';
import {Context} from '../Context/Context';
import firestore from '@react-native-firebase/firestore';

const Job = ({navigation, route}) => {
  const {data, jobCity} = route.params;
  const {userDetails, setUserDetails} = useContext(Context);
  const [imageLoading, setImageLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Description');
  const options = ['Description', 'Requirements', 'Education'];

  const openJobLink = () => {
    firestore()
      .collection('Users')
      .doc(`${userDetails.id}`)
      .update({jobsVisted: userDetails.jobsVisted + 1});
      
    Linking.openURL(data.job_apply_link).catch(err =>
      console.error("Couldn't load page", err),
    );
  };

  useEffect(() => {
    const checkSavedJobs = async () => {
      console.log('checking');
      if (userDetails.savedJobs.find(job => job.job_id === data.job_id)) {
        setIsSaved(true);
        console.log('iuiu');
      } else {
        console.log('poidchu');

        setIsSaved(false);
      }
    };
    checkSavedJobs();
  }, [userDetails.savedJobs]);

  const addToSavedJobs = () => {
    console.log(userDetails);
    firestore()
      .collection('Users')
      .doc(`${userDetails.id}`)
      .update({savedJobs: firestore.FieldValue.arrayUnion(data)});
  };

  const removeFromSavedJobs = () => {
    console.log(userDetails);
    firestore()
      .collection('Users')
      .doc(`${userDetails.id}`)
      .update({savedJobs: firestore.FieldValue.arrayRemove(data)});
  };

  const getInfo = () => {
    if (selectedOption === 'Description') {
      return (
        <Text className="text-[#fff] text-sm">{data.job_description}</Text>
      );
    }
    if (selectedOption === 'Requirements') {
      if (!data.job_required_skills)
        return (
          <View className="flex-row items-start mb-3 justify-start">
            <Text className="text-base font-bold mr-2">•</Text>
            <Text className="text-[#fff] text-base  flex-row">N/A</Text>
          </View>
        );

      return data.job_required_skills.map((skill, idx) => (
        <View key={idx} className="flex-row items-start mb-3 justify-start">
          <Text className="text-base font-bold mr-2">•</Text>
          <Text className="text-[#fff] text-base  flex-row">{skill}</Text>
        </View>
      ));
    }
    if (selectedOption === 'Education') {
      const educationDetails = [];
      for (const key in data.job_required_education) {
        if (data.job_required_education[key]) {
          educationDetails.push(key);
        }
      }

      if (educationDetails.length == 0) {
        return (
          <View className="flex-row items-start mb-3 justify-start">
            <Text className="text-base font-bold mr-2">•</Text>
            <Text className="text-[#fff] text-base  flex-row">N/A</Text>
          </View>
        );
      } else {
        return (
          <>
            {educationDetails.map((detail, idx) => (
              <View
                key={idx}
                className="flex-row items-start mb-3 justify-start">
                <Text className="text-base font-bold mr-2">•</Text>
                <Text className="text-[#fff] text-base capitalize  flex-row">
                  {detail.split('_').join(' ')}
                </Text>
              </View>
            ))}
          </>
        );
      }
    }
  };

  const imageUrl = data.employer_logo
    ? data.employer_logo
    : 'https://t3.gstatic.com/images?q=tbn:ANd9GcTDOYXIcuh82TjB56JO73sMj8PdWSA1A169_VSvlOt49-KrCQb7';

  return (
    <View className="bg-background h-full p-5 justify-between">
      <BackButton navigation={navigation} component="Home" />
      <View className="justify-center items-center mt-3">
        <View
          style={{width: 70, height: 70}}
          className="border-3 border-customColor1">
          {imageLoading && (
            <View
              style={{width: 70, height: 70}}
              className="bg-[#777777] rounded-full opacity-50 border-3  border-customColor1"></View>
          )}

          <Image
            source={{
              uri: imageUrl,
            }}
            style={{width: 70, height: 70}}
            className="rounded-full "
            resizeMode="contain"
            onLoadStart={() => {
              setImageLoading(true);
            }}
            onLoadEnd={() => {
              setImageLoading(false);
            }}
          />
        </View>
        <Text className="mt-3 font-bold text-xl">{data.job_title}</Text>
        <Text className="m-2 font-bold text-lg">{data.employer_name}</Text>
        <View className="flex-row items-center mb-3">
          <Ionicons name="ios-location-sharp" size={24} />
          <Text className=" ml-1 font-semibold text-base">{jobCity}</Text>
        </View>
      </View>
      <View className="flex-1">
        <View className="flex-row justify-center">
          {options.map((option, idx) => (
            <TouchableWithoutFeedback
              key={idx}
              onPress={() => {
                setSelectedOption(option);
              }}>
              <View
                className={
                  selectedOption === option
                    ? 'bg-customColor1 w-max py-3 px-3 rounded-full mx-2 justify-center items-center'
                    : 'border-2 border-customColor1 rounded-full w-max py-3 px-3 mx-2 text-[#fff] justify-center items-center'
                }>
                <Text
                  className={
                    selectedOption === option
                      ? 'text-background font-bold text-base'
                      : 'text-[#fff] font-bold text-base'
                  }>
                  {option}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <ScrollView className="mt-5">{getInfo()}</ScrollView>
      </View>
      <View className="mt-3 flex-row items-center justify-between bottom-0 w-full mx-auto">
        <TouchableWithoutFeedback
          onPress={!isSaved ? addToSavedJobs : removeFromSavedJobs}>
          <View className="border-2 border-customColor1 p-2 rounded-lg">
            <Ionicons
              name={isSaved ? 'heart-sharp' : 'heart-outline'}
              size={32}
              color="#9C4A8B"
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          onPress={openJobLink}
          className="bg-customColor1 py-4 rounded-lg w-9/12">
          <Text className="text-center font-bold text-xl">Apply to Job</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Job;
