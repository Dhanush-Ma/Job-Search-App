import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import getJobPlace from '../Utilities/getPlace';

const JobCard = ({navigation, data}) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [jobCity, setJobCity] = useState('');

  const imageUrl = data.employer_logo
    ? data.employer_logo
    : 'https://t3.gstatic.com/images?q=tbn:ANd9GcTDOYXIcuh82TjB56JO73sMj8PdWSA1A169_VSvlOt49-KrCQb7';

  useEffect(() => {
    (async () => {
      setJobCity(await getJobPlace(data.job_latitude, data.job_longitude));
    })();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Job', {
          data: data,
          jobCity
        });
      }}>
      <View className="border-2 border-customColor2 p-5 mb-5 rounded-xl ">
        <View className="flex-row gap-3 items-start justify-start">
          <View style={{width: 50, height: 50}}>
            {imageLoading && (
              <View
                style={{width: 50, height: 50}}
                className="bg-[#777777] rounded-full opacity-50"></View>
            )}

            <Image
              source={{
                uri: imageUrl,
              }}
              style={{width: 50, height: 50}}
              className="rounded-full"
              resizeMode="contain"
              onLoadStart={() => {
                setImageLoading(true);
              }}
              onLoadEnd={() => {
                setImageLoading(false);
              }}
            />
          </View>
          <View>
            <Text className="font-bold text-xl max-w-[260]" numberOfLines={1}>
              {data.job_title}
            </Text>
            <Text className="font-semibold text-lg">{data.employer_name}</Text>
          </View>
        </View>
        <View className="flex-row justify-between ml-1 mt-5">
          <View className="flex-row items-center">
            <Ionicons name="ios-location-sharp" size={24} />
            <Text className="text-base ml-1">{jobCity}</Text>
          </View>
          <Ionicons name="arrow-forward-sharp" size={24} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;
