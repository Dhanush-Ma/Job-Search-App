import {View, Text, FlatList} from 'react-native';
import React, {useContext} from 'react';
import BackButton from '../Components/BackButton';
import {Context} from '../Context/Context';
import JobCard from '../Components/JobCard';

const SavedJobs = ({navigation}) => {
  const {userDetails} = useContext(Context);
  return (
    <View className="bg-background h-full p-5 pb-0">
      <BackButton component={'Home'} navigation={navigation} />
      <Text className="text-xl font-bold text-center mt-2">Saved Jobs</Text>
      {userDetails.savedJobs.length > 0 ? (
        <FlatList
          className="mt-7"
          data={userDetails.savedJobs}
          keyExtractor={item => item.job_id}
          renderItem={({item}) => {
            return <JobCard navigation={navigation} data={item} />;
          }}
        />
      ) : (
        <View className="m-auto">
          <Text className="font-semibold text-2xl text-center">You don't have any jobs saved!</Text>
        </View>
      )}
    </View>
  );
};

export default SavedJobs;
