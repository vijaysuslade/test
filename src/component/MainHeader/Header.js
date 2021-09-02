import React, { Fragment } from 'react';
import Navigation from './Navigation';

import classes from './MainHeader.module.css';
import bookLogo from '../../assets/logo1.jpg';

const Header = () => {

  return (
    <Fragment>

      <header className={classes['main-header']} >
        <div className={classes.logo}>
          <img src={bookLogo} alt="BookLogo" />
          <h3>E-Library</h3>
        </div>
        <Navigation />
      </header>

    </Fragment >
  )

}
export default Header;