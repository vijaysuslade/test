import React, { useEffect, useState } from 'react';
import { NavLink, Route, useHistory } from 'react-router-dom';

const AuthContext = React.createContext({
  isLoggedIn: false,
  role: '',
  onLogout: () => { },
  onLogin: (id, role) => { },
})

export const AuthContextProvider = (props) => {
  let history = useHistory();
  const [isLoggedIn, setISisLoggedIn] = useState(false);
  const [role, setRole] = useState(localStorage.getItem('role'));
  let storedUserLoggedInInfo = localStorage.getItem('storedUserLoggedInInfo');
  useEffect(() => {
    if (storedUserLoggedInInfo === '1') {
      setRole(localStorage.getItem('role'));
      setISisLoggedIn(true);
    }
  }, [])

  const loginHandler = (id, role) => {
    localStorage.setItem('storedUserLoggedInInfo', '1');
    localStorage.setItem('id', id);
    localStorage.setItem('role', role);
    localStorage.setItem('loggedIn', true);
    setISisLoggedIn(true);
    setRole(role);

    if (role === "librarian") {
      history.push("/librarian");
    } else {
      history.push("/customer");
    }


  }
  const logoutHandler = () => {
    localStorage.removeItem('storedUserLoggedInInfo');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    setISisLoggedIn(false);
    setRole(' ');
    history.push("/login");
  }


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        role: role,
        onLogin: loginHandler,
        onLogout: logoutHandler
      }}
    >
      {props.children}
    </AuthContext.Provider >
  )
}

export default AuthContext