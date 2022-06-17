import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();
const GlobalState = ({ children }) => {
  const [userInfo, setUser] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userLogin'));
    if(user) {
      setUser(user);
    }
  },[]);

  return (
    <UserContext.Provider value={{ userInfo, setUser }}>
      { children }
    </UserContext.Provider>
  )
};

export const UserState = () => {
  return useContext(UserContext);
}

export default GlobalState;