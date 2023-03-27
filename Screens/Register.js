import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Modal from '../Utilities/modal';
import FeaterIcons from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import googleAuthenticate from '../Utilities/googleAuthenticate';
import auth from '@react-native-firebase/auth';

const Register = ({navigation}) => {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const setErrorInfo = msg => {
    setErrMsg(msg);
    setModal(true);
  };

  const handleChange = (text, attr) => {
    setFormData({
      ...formData,
      [attr]: text,
    });
  };

  const submitData = async () => {
    const username = formData.username.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();
    if (!username) {
      setErrorInfo('Username Required');
      return;
    }
    if (!email) {
      setErrorInfo('Email Required');
      return;
    }
    if (!password) {
      setErrorInfo('Password Required');
      return;
    }
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth()
          .currentUser.updateProfile({displayName: username})
          .then(() => {
            setLoading(false);
            setFormData({username: '', email: '', password: ''});
            navigation.navigate('Home');
          });
      })
      .catch(error => {
        setLoading(false);

        if (error.code === 'auth/email-already-in-use') {
          setErrorInfo('User already registered!');
        }

        if (error.code === 'auth/invalid-email') {
          setErrorInfo('Invalid Email');
        }

        if (error.code === 'auth/weak-password') {
          setErrorInfo('Password must be a length of 6.');
        }
      });
  };

  return (
    <View className="bg-background h-full p-12 items-center justify-center">
      <Text className="text-2xl text-center">Sign In</Text>
      <Text className="text-center">Please signin to explore more</Text>
      <View className="mt-8 mb-6">
        <View className="border-2 border-[#585858] w-72 flex-row items-center px-3">
          <FeaterIcons name="user" size={18} />
          <TextInput
            className="ml-2 pr-6 w-full "
            placeholder="Full Name"
            onChangeText={text => handleChange(text, 'username')}
            value={formData.username}
          />
        </View>
        <View className="border-2 border-[#585858] w-72 flex-row items-center px-3 my-5">
          <MaterialCommunityIcons name="email" size={18} />
          <TextInput
            className="ml-2 pr-6 w-full"
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={text => handleChange(text, 'email')}
            value={formData.email}
          />
        </View>
        <View className="border-2 border-[#585858] w-72 flex-row items-center px-3">
          <MaterialCommunityIcons name="security" size={18} />
          <TextInput
            className="ml-2 pr-6 w-full"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => handleChange(text, 'password')}
            value={formData.password}
          />
        </View>
      </View>
      <TouchableOpacity
        disabled={loading}
        className="font-extrabold bg-customColor1 py-3 rounded-md w-full h-12 justify-center"
        onPress={submitData}>
        {!loading ? (
          <Text className="text-center font-bold text-xl">Sign In</Text>
        ) : (
          <ActivityIndicator size="large" color="#ffffff" />
        )}
      </TouchableOpacity>
      <Text
        className="text-center mt-3"
        onPress={() => navigation.navigate('Login')}>
        Alreaady have an account? Log In
      </Text>
      <View className="flex-row items-center my-7">
        <View style={{flex: 1, height: 1, backgroundColor: 'grey'}} />
        <Text className="text-center mx-3"> OR </Text>
        <View style={{flex: 1, height: 1, backgroundColor: 'grey'}} />
      </View>
      <View>
        <View>
          <TouchableOpacity
            className="flex-row items-center justify-center p-3 border-2 border-[#585858]"
            onPress={() => {
              googleAuthenticate(navigation);
            }}>
            <MaterialCommunityIcons name="google" size={32} />
            <Text className="font-bold text-xl ml-6">Sign Up with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
      {modal && <Modal title={errMsg} setModal={setModal} />}
    </View>
  );
};

export default Register;
