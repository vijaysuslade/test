import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from '../UI/TextError'
import classes from './Registration.module.css'
import axios from 'axios';



function Registration() {

  const initialValues = {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string()
      .email('Invalid Email Format')
      .required('Required'),
    phoneNumber: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'password must match')
      .required('Required')
  })

  const onSubmit = values => {
    let customer = {
      cname: values.name,
      cemail: values.email,
      cphone: values.phoneNumber,
      password: values.password,
      cpassword: values.confirmPassword
    }
    console.log(customer)
    axios.post("http://localhost:8080/saveCustomer", customer).then(response => {
      console.log(response);
    })
    console.log(values.name)
  }




  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>

      <div className={classes.registrationbox}>

        <Form>
          <h1>Registration</h1>
          <div>
            <label htmlFor='name'>Name</label>
            <Field type='text' id='name' name='name' />
            <ErrorMessage name='name' component={TextError} />
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <Field type='text' id='email' name='email' />
            <ErrorMessage name='email' component={TextError} />
          </div>

          <div >
            <label htmlFor='phoneNumber'>Phone Number</label>
            <Field type='text' id='phoneNumber' name='phoneNumber' />
            <ErrorMessage name='phoneNumber' component={TextError} />
          </div>


          <div>
            <label htmlFor='password'>Password</label>
            <Field type='password' id='password' name='password' />
            <ErrorMessage name='password' component={TextError} />
          </div>

          <div>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <Field type='password' id='confirmPassword' name='confirmPassword' />
            <ErrorMessage name='confirmPassword' component={TextError} />
          </div>

          <div className={classes.formactions}>
            <button className="btn btn-warning" type='reset'>Reset</button>
            <div className={classes.submit}>
              <button className="btn btn-success ml-5" type='submit'>Submit</button>
            </div>
          </div>
        </Form>
      </div>
    </Formik >
  )
}

export default Registration
















/*import React, { useState, useContext, useEffect, useRef } from 'react';
import { NavLink, Route, useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';

import classes from './Registration.module.css';

import axios from 'axios';


const Registration = (props) => {
  const context = useContext(AuthContext);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const cpasswordRef = useRef(null);

  const history = useHistory();
  const [name, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(true);
  const [nameTouched, setNameTouched] = useState(false);

  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [cpassword, setCpassword] = useState('');
  const [cpasswordIsValid, setCpasswordIsValid] = useState(true);
  const [cpasswordTouched, setCpasswordTouched] = useState(false);

  const [membershipType, setMembershipType] = useState('');
  const [membershipTypeIsValid, setMembershipTypeIsValid] = useState(true);
  const [membershipTypeTouched, setMembershipTypeTouched] = useState(false);

  const nameInputIsInvalid = !nameIsValid && nameTouched;
  const emailInputIsInvalid = !emailIsValid && emailTouched;
  const passwordInputIsInvalid = !passwordIsValid && passwordTouched;
  const cpasswordInputIsInvalid = !cpasswordIsValid && cpasswordTouched;
  const membershipTypeInputIsInvalid = !membershipTypeIsValid && membershipTypeTouched;

  const [emails, setEmails] = useState([]);
  const [emailExists, setEmailExists] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState();


  useEffect(() => {
    axios.get("http://localhost:8080/getEmails").
      then(res => {
        setEmails(res.data.result);
      }).catch(error => {
        alert(error)
      })
  }, [])

  const nameChangeInputHandler = (event) => {
    event.preventDefault();
    setName(event.target.value);
    if (name.trim() == '' || event.key === "") {
      event.preventDefault();
      setNameIsValid(true);
    }
  }
  const emailChangeInputHandler = (event) => {
    event.preventDefault();
    setEmailExists(false);
    setEmail(event.target.value);
    if (email.trim() == '') {
      setEmailIsValid(true);
    }



    const emailAlredyPresent = emails.filter(email => email === emailRef.current.value)
    if (emailAlredyPresent.length != 0) {
      setEmailExists(true);
    }
  }

  const passwordChangeInputHandler = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
    if (password.trim() == '') {
      setPasswordIsValid(true);
    }

  }

  const cpasswordChangeInputHandler = (event) => {
    event.preventDefault();
    setConfirmPasswordValid(true);
    setCpassword(event.target.value);
    if (cpassword.trim() == '') {
      setCpasswordIsValid(true);
    }
    if (passwordRef.current.value === cpasswordRef.current.value) {
      setConfirmPasswordValid(false);
    }

  }
  const membershipTypeChangeInputHandler = (event) => {
    event.preventDefault();
    setMembershipType(event.target.value);
    if (membershipType.trim() == '') {
      setMembershipTypeIsValid(true);
    }
  }


  const nameInputBlurHandler = (event) => {
    event.preventDefault();
    setNameTouched(true);
    if (name.trim() == '') {
      setNameIsValid(false);
      return;
    }
  }

  const emailInputBlurHandler = (event) => {
    event.preventDefault();
    setEmailTouched(true);
    if (email.trim() == '') {
      setEmailIsValid(false);
      return;
    }
  }

  const passwordInputBlurHandler = (event) => {
    event.preventDefault();
    setPasswordTouched(true);
    if (password.trim() == '') {
      setPasswordIsValid(false);
      return;
    }
  }

  const cpasswordInputBlurHandler = (event) => {
    event.preventDefault();
    setCpasswordTouched(true);
    if (cpassword.trim() == '') {
      setCpasswordIsValid(false);
      return;
    }
  }

  const membershipTypeInputBlurHandler = (event) => {
    event.preventDefault();
    setMembershipTypeTouched(true);
    if (membershipType.trim() == '') {
      setMembershipTypeIsValid(false);
      return;
    }
  }


  const fromSubmitHandler = (event) => {
    event.preventDefault();
    setNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setCpasswordTouched(true);
    setMembershipTypeTouched(true);


    if (name.trim().length == '') {
      setNameIsValid(false);
      return
    } else if (email.trim().length == '') {
      setEmailIsValid(false);
      return
    } else if (password.trim().length == '') {
      setPasswordIsValid(false);
      return
    } else if (cpassword.trim().length == '') {
      setCpasswordIsValid(false);
      return
    } else if (membershipType.trim().length == '') {
      setMembershipTypeIsValid(false);
      return;

    } else {
      setNameIsValid(true);
      setEmailIsValid(true);
      setPasswordIsValid(true);
      setCpasswordIsValid(true);

      let user = {
        cname: name,
        cemail: email,
        password: password,
        cphone: '7276621071',
        cpassword: cpassword,

      }

      axios.post("http://localhost:8080/saveCustomer", user).then(response => {
        console.log(response);
      })
    }

    setName('');
    setEmail('');
    setPassword('');
    setCpassword('');
    setMembershipType('');
    history.push("/login");

  }

  const resetFormHandler = (event) => {
    event.preventDefault();
    setName('');
    setEmail('');
    setPassword('');
    setCpassword('');
    setMembershipType('');


  }

  return (
    <div className={classes.registration} >
      <form onSubmit={fromSubmitHandler} className={classes.registrationbox} >

        <div className="form-group">
          <h1 className="ml-5">Register</h1>
          <label htmlFor='name'>Name</label>

          <input
            type='name'
            id='name'
            value={name}
            onChange={nameChangeInputHandler}
            onBlur={nameInputBlurHandler}
            className="form-control"

          />
          {nameInputIsInvalid && <p className={classes.errortext}> Required</p>}
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={emailChangeInputHandler}
            onBlur={emailInputBlurHandler}
            className="form-control"
            ref={emailRef}
          />
          {emailInputIsInvalid && <p className={classes.errortext}> Required</p>}
          {emailExists && <p className={classes.errortext}>Email already exists</p>}
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={passwordChangeInputHandler}
            onBlur={passwordInputBlurHandler}
            className="form-control"
            ref={passwordRef}
          />
          {passwordInputIsInvalid && <p className={classes.errortext}> Required</p>}


          <label htmlFor='cpassword'>Confirm Password</label>
          <input
            type='password'
            id='cpassword'
            value={cpassword}
            onChange={cpasswordChangeInputHandler}
            onBlur={cpasswordInputBlurHandler}
            className="form-control"
            ref={cpasswordRef}
          />
          {cpasswordInputIsInvalid && <p className={classes.errortext}> Required</p>}
          {confirmPasswordValid && <p className={classes.errortext}> Confirm password not same..</p>}
          <label htmlFor='membershipType'>membership Type:</label>
          <select
            onChange={membershipTypeChangeInputHandler}
            onBlur={membershipTypeInputBlurHandler}
            value={membershipType}
            className="form-control" >
            <option value="select">Select</option>
            <option value="primary">Primary</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
          </select>
          {membershipTypeInputIsInvalid && <p className={classes.errortext}> Required</p>}
          <div className={classes.formactions}>
            <div> <button className="btn btn-success" onClick={fromSubmitHandler}>Register</button></div>
            <div className={classes.reset}><button className="btn btn-warning" onClick={resetFormHandler}>Reset</button></div>
          </ div>

        </div>
      </form >
    </div >
  )
}
export default Registration;
*/