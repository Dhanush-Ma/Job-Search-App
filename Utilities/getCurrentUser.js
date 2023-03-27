import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const getCurrentUser = () => {
  const loggedInUser = auth().currentUser;
  console.log(loggedInUser);
  if (loggedInUser) {
    return {
      id: loggedInUser.uid,
      name: loggedInUser.displayName,
      url: loggedInUser.photoURL,
      email: loggedInUser.email,
      accountCreated: loggedInUser.metadata.creationTime,
    };
  } else return false;
};



export default getCurrentUser;
