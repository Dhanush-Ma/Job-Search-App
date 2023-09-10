import {View, Text, ScrollView, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import styles from '../Utilities/globals';
import LinearGradient from 'react-native-linear-gradient';
const Pagination = ({jobsPerPage, totalJobs, paginate, currentPage}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row justify-between w-full">
        {pageNumbers.map(number => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                paginate(number);
              }}>
              <View
                className={`w-10 h-10  rounded-full  border-customColor1 mr-2 ${
                  number === currentPage ? 'border-0 ' : 'border-2'
                }`}>
                <LinearGradient
                  className="rounded-full w-full h-full justify-center items-center"
                  colors={
                    number === currentPage
                      ? ['#cc2b5e', '#753a88']
                      : ['#1F1D36', '#1F1D36']
                  }
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <Text style={{color: styles.color}}>{number}</Text>
                </LinearGradient>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Pagination;
