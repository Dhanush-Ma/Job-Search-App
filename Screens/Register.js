import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState, useContext} from 'react';
import Modal from '../Utilities/modal';
import FeaterIcons from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import googleAuthenticate from '../Utilities/googleAuthenticate';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../Context/AuthContext';
import styles from '../Utilities/globals';
const Register = ({navigation}) => {
  const {setAuth} = useContext(AuthContext);
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
            setAuth(true);
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
    <View className="bg-background h-full px-12 items-center justify-center">
      <View>
        <Image
          source={require('../assets/signin.png')}
          style={{height: 200, width: 200}}
          resizeMode="contain"
        />
      </View>
      <Text className="text-center mt-5 text-lg" style={{color: styles.color}}>
        Please Sign In to explore Job Quest!
      </Text>
      <View className="mt-4 mb-6">
        <View className="border-2 border-[#efefef] w-72 flex-row items-center px-3">
          <FeaterIcons name="user" size={18} color="#fff" />
          <TextInput
            className="ml-2 pr-6 w-full "
            placeholder="Full Name"
            onChangeText={text => handleChange(text, 'username')}
            value={formData.username}
            style={{color: styles.color}}
          />
        </View>
        <View className="border-2 border-[#efefef] w-72 flex-row items-center px-3 my-5">
          <MaterialCommunityIcons name="email" size={18} color="#fff" />
          <TextInput
            className="ml-2 pr-6 w-full"
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={text => handleChange(text, 'email')}
            value={formData.email}
            style={{color: styles.color}}
          />
        </View>
        <View className="border-2 border-[#efefef] w-72 flex-row items-center px-3">
          <MaterialCommunityIcons name="security" size={18} color="#fff" />
          <TextInput
            className="ml-2 pr-6 w-full"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => handleChange(text, 'password')}
            value={formData.password}
            style={{color: styles.color}}
          />
        </View>
      </View>
      <TouchableOpacity
        disabled={loading}
        className="font-extrabold bg-customColor1 py-3 rounded-md w-full h-12 justify-center"
        onPress={submitData}>
        {!loading ? (
          <Text
            style={{color: styles.color}}
            className="text-center font-bold text-xl">
            Sign In
          </Text>
        ) : (
          <ActivityIndicator size="large" color="#ffffff" />
        )}
      </TouchableOpacity>
      <Text
        style={{color: styles.color}}
        className="text-center mt-3 text-base "
        onPress={() => navigation.navigate('Login')}>
        Alreaady have an account? Log In
      </Text>
      {/* <View className="flex-row items-center my-7">
        <View style={{flex: 1, height: 1, backgroundColor: '#fff'}} />
        <Text style={{color: styles.color}} className="text-center mx-3">
          OR
        </Text>
        <View style={{flex: 1, height: 1, backgroundColor: '#fff'}} />
      </View>
      <View>
        <View>
          <TouchableOpacity
            className="flex-row items-center justify-center p-3 border-2 border-[#efefef]"
            onPress={() => {
              googleAuthenticate(navigation);
            }}>
            <Image
              source={require('../assets/google.png')}
              style={{height: 32, width: 32}}
              resizeMode="contain"
            />
            <Text
              style={{color: styles.color}}
              className="font-bold text-xl ml-6">
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View> */}
      {modal && <Modal title={errMsg} setModal={setModal} />}
    </View>
  );
};

export default Register;
