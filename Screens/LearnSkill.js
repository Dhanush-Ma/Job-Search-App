import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState, useCallback, useContext} from 'react';
import BackButton from '../Components/BackButton';
import styles from '../Utilities/globals';
import LinearGradient from 'react-native-linear-gradient';
import Player from '../Components/Player';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Context} from '../Context/Context';

const LearnSkill = ({route, navigation}) => {
  const {data} = route.params;
  const {id, logo} = data;
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoid, setVideoid] = useState('');
  const [feedbackMsg, setFeedBackMsg] = useState('');
  const {userDetails} = useContext(Context);

  const sendFeedBack = videoid => {
    setVideoid(videoid);
    setModalVisible(() => true);
  };

  const sendFeedBackToBackend = () => {
    firestore()
      .collection('Feedbacks')
      .add({
        videoid: videoid,
        userid: userDetails.id,
        description: feedbackMsg,
      })
      .then(() => {
        console.log('feedback added!');
        setFeedBackMsg('');
      });
  };

  useEffect(() => {
    fetch(`https://upskill-api.onrender.com/v1/video?language=${id}`)
      .then(res => res.json())
      .then(data => {
        setResult(data);
        setLoading(false);
      })
      .catch(err => console.log('here', err));
  }, []);

  return (
    <>
      <BackButton
        colorSpecify={true}
        component={'UpSkill'}
        navigation={navigation}
      />
      <LinearGradient
        className="h-full w-full justify-center items-center"
        colors={['#cc2b5e', '#753a88']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View className="h-full relative items-center pt-5 px-3">
          {!loading ? (
            <>
              <Image
                source={{uri: logo}}
                style={{width: 90, height: 90}}
                resizeMode="contain"
              />
              <Text
                style={{color: styles.color}}
                className="text-2xl mb-3 rounded-full">
                {data.language}
              </Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                {result &&
                  result.data.map((obj, idx) => {
                    return obj.videoIds.map(id => {
                      return (
                        <View
                          key={id}
                          className=" mb-8 justify-center items-end gap-0">
                          <Player id={id} />
                          <TouchableOpacity onPress={() => sendFeedBack(id)}>
                            <View className="mr-2 mt-2">
                              <MaterialIcons
                                name="feedback"
                                size={32}
                                color="#fff"
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    });
                  })}
              </ScrollView>
              {/* MODAL */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>
                <View
                  className="flex-1 w-full h-full justify-center items-center"
                  style={{backgroundColor: 'rgba(12, 12, 12, 0.5)'}}>
                  <View className="bg-[#fffcfc] w-10/12 h-3/4 justify-start py-10 px-8 items-center z-10 rounded-md">
                    <TouchableOpacity
                      className="absolute -top-4 -right-4 bg-[#000] rounded-full border-4 border-[#121212]"
                      onPress={() => setModalVisible(!modalVisible)}>
                      <AntDesign name="closecircle" size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text className="text-[#121212] font-bold text-2xl">
                      FeedBack Dialog Box
                    </Text>
                    <View className="w-full mt-5 my-auto justify-center ">
                      <View className="mb-5">
                        <Text className="text-[#121212] font-bold text-2xl">
                          Video ID
                        </Text>
                        <TextInput
                          className="text-[#121212] border-b-2 pl-2 text-lg"
                          value={videoid}
                          editable={false}
                        />
                      </View>
                      <View>
                        <Text className="text-[#121212] font-bold text-2xl">
                          FeedBack
                        </Text>
                        <TextInput
                          className="text-[#121212] border-b-2 pl-2 text-base"
                          multiline={true}
                          maxLength={200}
                          placeholder="Your feedback here..."
                          placeholderTextColor="#131313"
                          value={feedbackMsg}
                          onChangeText={text => setFeedBackMsg(text)}
                        />
                      </View>
                      <TouchableOpacity
                        className="bg-[#121212]  py-3 rounded-md mt-6"
                        onPress={() => {
                          if (feedbackMsg) {
                            sendFeedBackToBackend();
                            Alert.alert(
                              'Feedback',
                              'Your Feedback sent successfully',
                            );
                            setModalVisible(!modalVisible);
                          }
                        }}>
                        <Text className="text-[#f4f4f4] text-center">
                          SUBMIT
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </>
          ) : (
            <ActivityIndicator
              className="flex-1 justify-center items-center"
              size={86}
              color="#fff"
            />
          )}
        </View>
      </LinearGradient>
    </>
  );
};

export default LearnSkill;
