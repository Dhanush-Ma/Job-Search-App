import React, {createContext, useState, useRef} from 'react';

export const Context = createContext();

const ContextProvider = props => {
  const [user, setUser] = useState({});
  const [userDetails, setUserDetails] = useState({});
const flatListRef = useRef();

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        userDetails,
        setUserDetails,
        flatListRef
      }}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
