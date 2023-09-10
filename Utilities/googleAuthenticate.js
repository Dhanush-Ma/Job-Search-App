import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import getCurrentUser from './getCurrentUser';



async function googleAuthenticate() {
  console.log('hered');
  try {
    // Check if your device supports Google Play
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '625286252502-linh68flj4oos1mtf4iiv7u0dqpa98b1.apps.googleusercontent.com',
      offlineAccess: true,
    });

    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    console.log('idtoken', idToken);
    // Create a Google credential with the token
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential);
  } catch (error) {
    // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //   // user cancelled the login flow
    //   console.log(error, 'here1');
    // } else if (error.code === statusCodes.IN_PROGRESS) {
    //   // operation (f.e. sign in) is in progress already
    //   console.log(error, 'here2');
    // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //   // play services not available or outdated
    //   console.log(error, 'here3');
    // } else {
    // some other error
    console.log(error, 'here at catch error block');
    // }
  }
}

// async function googleAuthenticate(navigation) {
//   console.log('google authentication');

//   onGoogleButtonPress()
//     .then(() => {
//       console.log('Signed in with Google!');
//       getCurrentUser();
//     })
//     .catch(err => console.log(err));
// }

export default googleAuthenticate;
