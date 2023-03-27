import auth from '@react-native-firebase/auth';

const logout = (navigation) => {
    try {
        auth()
          .signOut()
          .then(() => navigation.navigate('Login'));
    } catch (error) {
        console.log(error)
    }
  
};

export default logout;
