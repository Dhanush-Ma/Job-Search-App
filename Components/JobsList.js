import {FlatList, Text} from 'react-native';
import React, {useContext} from 'react';
import JobCard from './JobCard';
import {Context} from '../Context/Context';
import styles from '../Utilities/globals';

const JobsList = ({navigation, data, query}) => {
  const {flatListRef} = useContext(Context);

  return (
    <>
      <FlatList
        nestedScrollEnabled
        ListHeaderComponent={
          <Text
            style={{color: styles.color}}
            className="font-bold text-lg mb-3">
            Showing results for{' '}
            <Text className="italic font-bold">"{query}"</Text>
          </Text>
        }
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item, idx) => idx}
        renderItem={({item}) => {
          return <JobCard navigation={navigation} data={item} />;
        }}
      />
    </>
  );
};

export default JobsList;
