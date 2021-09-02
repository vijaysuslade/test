import React, { useContext } from 'react';
import { NavLink, Route, useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './Navigation.module.css';
const Navigation = () => {
  const context = useContext(AuthContext);
  return (
    <div>
      <nav className={classes.nav}>
        <ul>
          <li>
            {!context.isLoggedIn && <NavLink to="/">Home</NavLink>}
          </li>
          <li>
            {!context.isLoggedIn && <NavLink to="/login">Login</NavLink>}
          </li>
          <li>
            {!context.isLoggedIn && <NavLink to="/register">Register</NavLink>}
          </li>
          <li>
            {context.isLoggedIn && context.role == 'admin' && <NavLink to="/students">ViewMember</NavLink>}
          </li>
          <li>
            {context.isLoggedIn && (context.role == 'admin' || context.role == 'Student') && <NavLink to="/bookOverview">Books</NavLink>}
          </li>
          <li>
            {context.isLoggedIn && (context.role == 'admin' || context.role == 'Student') && <NavLink to="/articleOverView">Articles</NavLink>}
          </li>
          <li>
            {context.isLoggedIn && (context.role == 'admin' || context.role == 'Student') && <NavLink to="/magzineOverview">Magzines</NavLink>}
          </li>
          <li>
            {context.isLoggedIn && context.role === "Student" && <NavLink to="/request">Request</NavLink>}
          </li>

          <li>
            {context.isLoggedIn && <button onClick={() => context.onLogout()}>Logout</button>}
          </li>

        </ul>
      </nav>
    </div >


  )
}
export default Navigation