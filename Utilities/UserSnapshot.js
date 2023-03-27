import {useEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Context} from '../Context/Context';

function UserSnapshot({userId}) {
  const {setUserDetails} = useContext(Context);
  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        setUserDetails(documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [userId]);
}

export default UserSnapshot;
