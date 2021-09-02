import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../store/auth-context';
import classes from './Home.module.css';
import Login from '../Login/Login';
import Button from 'react-bootstrap/Button';
import Corousal from '../MainHeader/Corousal/Corousal';
const Home = () => {
  return (
    <div>
      <div>
        <Corousal />
      </div>
      <div className={classes.membership}>
        <h1>Membership</h1>
        <div className={classes.membership}>
          <h2>Gold</h2>
          <p> The Full Service membership gives you full access to all the equipment and classes, plus the services of our exercise and weight loss professionals to help you desig</p>
        </div>
        <div className={classes.membership}>
          <h2>Sliver</h2>
          <p> The Full Service membership gives you full access to all the equipment and classes, plus the services of our exercise and weight loss professionals to help you desig</p>
        </div>
      </div>
    </div>


  )
}
export default Home;