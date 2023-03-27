import {View, ScrollView, FlatList, Text} from 'react-native';
import React from 'react';
import JobCard from './JobCard';
import data from '../Screens/data';

const JobsList = ({navigation}) => {
  return (
    <FlatList
      data={data.data}
      keyExtractor={(item) => item.job_id}
      renderItem={({item}) => {
        return <JobCard navigation={navigation} data={item} />;
      }}
    />
  );
};

export default JobsList;
