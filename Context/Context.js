import React, {createContext, useState} from 'react';

export const Context = createContext();

const ContextProvider = props => {
  const [user, setUser] = useState({});
  const [userDetails, setUserDetails] = useState({});


  return (
    <Context.Provider
      value={{
        user,
        setUser,
        userDetails,
        setUserDetails,
      }}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
