import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'
import TextError from '../UI/TextError'
import classes from './Login.module.css'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import AuthContext from '../../store/auth-context';



function Login() {
  let history = useHistory();
  const context = useContext(AuthContext)


  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid Email Format')
      .required('Required'),
    password: Yup.string().required('Required')
  })

  const onSubmit = values => {

    let customer = {
      cemail: values.email,
      password: values.password
    }
    axios.post("http://localhost:8080/login", customer).
      then(res => {
        console.log(res)
        if (res.data.status == 200) {
          context.onLogin(res.data.result.id, res.data.result.role);
        } else if (res.data.status == 400) {
          alert(res.data.message);
        }
      }).catch(error => {
        alert(error)
      })

  }





  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>

      {formik => {
        console.log("formik props", formik)
        return (
          <div className={classes.login} >
            <div className={classes.loginbox}>

              <Form>
                <center><b>SignIn</b></center>

                <div>
                  <label htmlFor='email'>Email</label>
                  <Field type='text' id='email' name='email' />
                  <ErrorMessage name='email' component={TextError} />
                </div>

                <div>
                  <label htmlFor='password'>Password</label>
                  <Field type='password' id='password' name='password' />
                  <ErrorMessage name='password' component={TextError} />
                </div>

                <div>
                  <button className={classes.loginbutton} type='submit'>Login</button>
                </div>

                <div>
                  <NavLink to="/register">Register User</NavLink>
                  <NavLink to="/forgetpassword">Forget Password</NavLink>
                </div>

              </Form>
            </div>
          </div>
        )
      }}

    </Formik >


  )
}

export default Login























/*
import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import AuthContext from '../../store/auth-context';
import classes from './Login.module.css';

const Login = (props) => {
  let history = useHistory();
  console.log("Login")
  const context = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);

  const [password, setPassWord] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailInputIsInvalid = !emailIsValid && emailTouched;
  const passwordInputIsInvalid = !passwordIsValid && passwordTouched;

  const emailChangeInputHandler = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
    if (email.trim() === '') {
      setEmailIsValid(true);
    }
  };
  const passwordChangeInputHandler = (event) => {
    event.preventDefault();
    setPassWord(event.target.value);
    if (password.trim() === '') {
      setPasswordIsValid(true);
    }
  }

  const emailInputBlurHandler = (event) => {
    event.preventDefault();
    setEmailTouched(true);
    if (email.trim() === '') {
      setEmailIsValid(false);
      return;
    }
  }
  const passwordInputBlurHandler = (event) => {
    event.preventDefault();
    setPasswordTouched(true);
    if (password.trim() === '') {
      setPasswordIsValid(false);
      return;
    }
  }

  const loginHandler = (event) => {
    event.preventDefault();
    setPasswordTouched(true)
    setEmailTouched(true);

    if (email.trim() === '' && password.trim() === '') {
      setEmailIsValid(false);
      setPasswordIsValid(false);
      return
    }
    else if (email.trim() === '') {
      setEmailIsValid(false);
      return
    }
    else if (password.trim() === '') {
      setPasswordIsValid(false);
      return
    }
    else {
      setEmailIsValid(true);
      setPasswordIsValid(true);
    }
    const login = {
      cemail: email,
      password: password
    }

    axios.post("http://localhost:8080/login", login).
      then(res => {
        console.log(res)
        if (res.data.status == 200) {
          context.onLogin(res.data.result.id, res.data.result.role);
        } else if (res.data.status == 400) {
          alert(res.data.message);
        }
      }).catch(error => {
        alert(error)
      })
  }
  return (
    <div className={classes.logincontainer}>
      <div className={classes.login} >
        <form onSubmit={loginHandler} className={classes.loginbox} >
          <div className="form-group">
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={emailChangeInputHandler}
              onBlur={emailInputBlurHandler}
              className="form-control"
            />
            {emailInputIsInvalid && <p className={classes.errortext}> Required</p>}
          </div>
          <div classNames="form-group">
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={passwordChangeInputHandler}
              onBlur={passwordInputBlurHandler}
              className="form-control"
            />
            {passwordInputIsInvalid && < p className={classes.errortext}> Required</p>}
          </div>
          <div className="form-actions">
            <div className={classes.actions}>
              <button className={classes.loginbutton} >Login</button>
            </div>
            <div className="mt-3">
              <NavLink to="/register">Register User</NavLink>
              <NavLink to="/forgetpassword">Forget Password</NavLink>
            </div>
          </div>
        </form >
      </div >
    </div>
  );
}
export default Login;
*/