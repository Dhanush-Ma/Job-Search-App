import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

/**/

import Profile from '../Screens/Profile';
import SavedJobs from '../Screens/SavedJobs';
import Job from '../Screens/Job';
import DrawerNavigator from '../DrawerComponents/DrawerNavigator';
import LearnSkill from '../Screens/LearnSkill';

const UserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SavedJobs" component={SavedJobs} />
      <Stack.Screen name="Job" component={Job} />
      <Stack.Screen name="LearnSkill" component={LearnSkill} />
    </Stack.Navigator>
  );
};

export default UserStack

