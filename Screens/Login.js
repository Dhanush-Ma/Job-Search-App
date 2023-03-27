import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from '../Utilities/modal';
import googleAuthenticate from '../Utilities/googleAuthenticate';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const setErrorInfo = msg => {
    setErrMsg(msg);
    setModal(true);
  };

  // getCurrentUser();

  const handleChange = (text, attr) => {
    setFormData({
      ...formData,
      [attr]: text,
    });
  };

  const submitData = () => {
    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email) {
      setErrorInfo('Invalid Email');
      return;
    }
    if (!password) {
      setErrorInfo('Invalid Password');
      return;
    }

    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
        setFormData({username: '', email: '', password: ''});
        navigation.navigate('Home');
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
        if (error.code === 'auth/user-not-found') {
          setErrorInfo('User not registered!');
        }

        if (error.code === 'auth/invalid-email') {
          setErrorInfo('Invalid Email');
        }

        if (error.code === 'auth/wrong-password') {
          setErrorInfo('Invalid Password');
        }
      });

  };

  return (
    <View className="bg-background h-full p-12 items-center justify-center">
      <Text className="text-2xl text-center">Login</Text>
      <Text className="text-center">Please login to explore more</Text>
      <View className="mb-6">
        <View className="border-2 border-[#585858] w-72 flex-row items-center px-3 my-5">
          <MaterialCommunityIcons name="email" size={18} />
          <TextInput
            name="email"
            className="ml-2 pr-6 w-full"
            placeholder="Email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={text => handleChange(text, 'email')}
          />
        </View>
        <View className="border-2 border-[#585858] w-72 flex-row items-center px-3">
          <MaterialCommunityIcons name="security" size={18} />
          <TextInput
            name="password"
            className="ml-2 pr-6 w-full"
            placeholder="Password"
            secureTextEntry={true}
            value={formData.password}
            onChangeText={text => handleChange(text, 'password')}
          />
        </View>
      </View>
      <TouchableOpacity
        disabled={loading}
        className="bg-customColor1 py-3 rounded-md w-full h-12 justify-center"
        onPress={submitData}>
        {!loading ? (
          <Text className="text-center font-bold text-xl">Login</Text>
        ) : (
          <ActivityIndicator size="large" color="#ffffff" />
        )}
      </TouchableOpacity>
      <Text
        className="text-center mt-3"
        onPress={() => navigation.navigate('Register')}>
        Don't have have an account? Sign In
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

export default Login;
