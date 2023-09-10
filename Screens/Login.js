import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState, useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from '../Utilities/modal';
import googleAuthenticate from '../Utilities/googleAuthenticate';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../Context/AuthContext';
import styles from '../Utilities/globals';

const Login = ({navigation}) => {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const {setAuth} = useContext(AuthContext);

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
        setAuth(true);
      })
      .catch(error => {
        setLoading(false);
        console.log("login err",error);
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
    <View className="bg-background h-full px-12 items-center justify-center">
      <View>
        <Image
          source={require('../assets/login.png')}
          style={{height: 200, width: 200}}
          resizeMode="contain"
        />
      </View>
      <Text style={{color: styles.color}} className="text-center mt-5 text-xl">
        Please login to continue exploring!
      </Text>
      <View className="mb-6">
        <View className="border-2 border-[#efefef] w-72 flex-row items-center px-3 my-5">
          <MaterialCommunityIcons name="email" size={18} color="#fff" />
          <TextInput
            name="email"
            className="ml-2 pr-6 w-full"
            placeholder="Email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={text => handleChange(text, 'email')}
          />
        </View>
        <View className="border-2 border-[#efefef] w-72 flex-row items-center px-3">
          <MaterialCommunityIcons name="security" size={18} color="#fff" />
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
          <Text
            style={{color: styles.color}}
            className="text-center font-bold text-xl">
            Login
          </Text>
        ) : (
          <ActivityIndicator size="large" color="#ffffff" />
        )}
      </TouchableOpacity>
      <Text
        style={{color: styles.color}}
        className="text-center mt-3"
        onPress={() => navigation.navigate('Register')}>
        Don't have have an account? Sign In
      </Text>
      {/* <View className="flex-row items-center my-7">
        <View style={{flex: 1, height: 1, backgroundColor: 'grey'}} />
        <Text style={{color: styles.color}} className="text-center mx-3">
          {' '}
          OR{' '}
        </Text>
        <View style={{flex: 1, height: 1, backgroundColor: 'grey'}} />
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

export default Login;
