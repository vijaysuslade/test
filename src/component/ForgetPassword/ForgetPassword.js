import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import TextError from '../UI/TextError'
import classes from './ForgetPassword.module.css'

const ForgetPassword = () => {

    const initialValues = {
        email: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid Email Format')
            .required('Required'),
    })

    const onSubmit = values => {
        axios.get(`http://localhost:8080/forgetPassword?email=${values.email}`).then(res => {
            if (res.data.status == 200) {
                alert(res.data.message);
            } else if (res.data.status == 400) {
                alert(res.data.message);
            }

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
                    <div className={classes.forgetpasswordbox}>
                        <Form>
                            <center><b>SignIn</b></center>

                            <div>
                                <label htmlFor='email'>Email</label>
                                <Field type='text' id='email' name='email' />
                                <ErrorMessage name='email' component={TextError} />
                            </div>

                            <div>
                                <button className={classes.submitbutton} type='submit'>Send</button>
                            </div>
                        </Form>
                    </div>
                )
            }}

        </Formik >



    )
}

export default ForgetPassword
















// import React, { useState, useContext } from 'react';
// import { NavLink, Route, useHistory } from 'react-router-dom';
// import AuthContext from '../../store/auth-context';
// import classes from '././ForgetPassword.module.css';
// import axios from 'axios';

// const ForgetPassword = (prpos) => {
//     const context = useContext(AuthContext);

//     const history = useHistory();
//     const [email, setEmail] = useState('');
//     const [emailIsValid, setEmailIsValid] = useState(true);
//     const [emailTouched, setEmailTouched] = useState(false);

//     const emailInputIsInvalid = !emailIsValid && emailTouched;

//     const emailChangeInputHandler = (event) => {
//         event.preventDefault();
//         setEmail(event.target.value);
//         if (email.trim() == '') {
//             setEmailIsValid(true);
//         }
//     }
//     const emailInputBlurHandler = (event) => {
//         event.preventDefault();
//         setEmailTouched(true);
//         if (email.trim() == '') {
//             setEmailIsValid(false);
//             return;
//         }
//     }
//     const data = {
//         email: email
//     }
//     axios.post('forgot', data).
//         then(res => {
//             if (res.data.status == 200) {
//                 context.onLogin(res.data.result.id, res.data.result.role);
//             } else if (res.data.status == 404) {
//                 alert(res.data.message);
//             } else if (res.data.status == 401) {
//                 alert(res.data.message);
//             }
//         }).catch(error => {
//             alert(error)
//         })


//     const fromSubmitHandler = (event) => {
//         event.preventDefault();
//         setEmailTouched(true);
//         history.push("/");
//     }

//     return (
//         <div className={classes.forgetpasswordcontainer}>
//             <div className={classes.forgetpassword} >
//                 <form onSubmit={fromSubmitHandler} className={classes.forgetpasswordbox} >
//                     <h2>Forget Password</h2>
//                     <div className="form-group">
//                         <label htmlFor='email'>Email</label>
//                         <input
//                             type='email'
//                             id='email'
//                             value={email}
//                             onChange={emailChangeInputHandler}
//                             onBlur={emailInputBlurHandler}
//                             className="form-control"
//                         />
//                         {emailInputIsInvalid && <p className={classes.errortext}> Required</p>}
//                         <div className="form-actions">
//                             <button className={classes.submitbutton} onClick={fromSubmitHandler}>Send</button>

//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }
// export default ForgetPassword;