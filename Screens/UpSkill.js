import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackButton from '../Components/BackButton';
import SkillCard from '../Components/SkillCard';
import styles from '../Utilities/globals';
const UpSkill = ({navigation}) => {
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://upskill-api.onrender.com/v1/list')
      .then(res => res.json())
      .then(data => {
        console.log('kol');
        console.log(data);
        setdata(data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <View className="bg-background h-full">
      <BackButton
        navigation={navigation}
        component={'DrawerHome'}
        colorSpecify={true}
      />
      <Text
        style={{color: styles.color}}
        className="text-center font-bold text-2xl mt-6 mb-6">
        UpSkill
      </Text>
      {!loading ? (
        <View className="flex-1">
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data.languages}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => {
              return <SkillCard navigation={navigation} data={item} />;
            }}
          />
        </View>
      ) : (
        <View
          className="flex-1 justify-center 
      ">
          <ActivityIndicator color="#9C4A8B" size="large" />
        </View>
      )}
    </View>
  );
};

export default UpSkill;
