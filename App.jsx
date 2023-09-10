

import {SafeAreaView} from 'react-native';

import Router from './Router';
import ContextProvider from './Context/Context';
import AuthContextProvider from './Context/AuthContext';

function App() {
  return (
    <ContextProvider>
      <AuthContextProvider>
          <Router />
      </AuthContextProvider>
    </ContextProvider>
  );
}

export default App;
