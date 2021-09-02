import axios from 'axios';
import React, { useState, } from 'react';
import { useHistory } from "react-router-dom";
import classes from './Request.module.css';

const Request = (props) => {
    const history = useHistory();
    const [request, setRequest] = useState('');
    const [requestIsValid, setRequestIsValid] = useState(true);
    const [requestTouched, setRequestTouched] = useState(false);

    const [name, setName] = useState('');
    const [nameIsValid, setNameIsValid] = useState(true);
    const [nameTouched, setNameTouched] = useState(false);

    const [author, setAuthor] = useState('');
    const [authorIsValid, setAuthorIsValid] = useState(true);
    const [authorTouched, setAuthorTouched] = useState(false);

    const [publisher, setPublisher] = useState('');
    const [publisherIsValid, setPublisherIsValid] = useState(true);
    const [publisherTouched, setPublisherTouched] = useState(false);

    const requestInputIsInvalid = !requestIsValid && requestTouched;
    const authorInputIsInvalid = !authorIsValid && authorTouched;
    const publisherInputIsInvalid = !publisherIsValid && publisherTouched;
    const nameInputIsInvalid = !nameIsValid && nameTouched;

    const requestChangeInputHandler = (event) => {
        event.preventDefault();
        setRequest(event.target.value);
        if (request.trim() == '') {
            setRequestIsValid(true);
        }
    }
    const nameChangeInputHandler = (event) => {
        event.preventDefault();
        setName(event.target.value);
        if (name.trim() == '') {
            setNameIsValid(true);
        }
    }

    const authorChangeInputHandler = (event) => {
        event.preventDefault();
        setAuthor(event.target.value);
        if (author.trim() == '') {
            setAuthorIsValid(true);
        }
    }

    const publisherChangeInputHandler = (event) => {
        event.preventDefault();
        setPublisher(event.target.value);
        if (publisher.trim() == '') {
            setPublisherIsValid(true);
        }
    }

    const requestInputBlurHandler = (event) => {
        event.preventDefault();
        setRequestTouched(true);
        if (request.trim() == '') {
            setRequestIsValid(false);
            return;
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
    const authorInputBlurHandler = (event) => {
        event.preventDefault();
        setAuthorTouched(true);
        if (author.trim() == '') {
            setAuthorIsValid(false);
            return;
        }
    }
    const publisherInputBlurHandler = (event) => {
        event.preventDefault();
        setPublisherTouched(true);
        if (publisher.trim() == '') {
            setPublisherIsValid(false);
            return;
        }
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        setRequestTouched(true);
        setNameTouched(true);
        setAuthorTouched(true);
        setPublisherTouched(true);

        if (request.trim().length == '') {
            setRequestIsValid(false);
            return
        } else if (name.trim().length == '') {
            setNameIsValid(false);
            return
        } else if (author.trim().length == '') {
            setAuthorIsValid(false);
            return
        } else if (publisher.trim().length == '') {
            setPublisherIsValid(false);
            return
        } else {
            setRequestIsValid(true);
            setNameIsValid(true);
            setAuthorIsValid(true);
            setPublisherIsValid(true);
        }
        let requestDetails = {
            studentId: localStorage.getItem("id"),
            requestfor: request,
            name: name,
            author: author,
            publisher: publisher,
        }
        console.log(requestDetails)
        axios.post("http://localhost:8080/makeRequest", requestDetails).then(res => {
            if (res.status) {
                alert("Request has been placed...")
                history.push('/');
            }
        }).catch(err => {

        })


    }

    return (
        <div className={classes.request} >
            <form onSubmit={formSubmitHandler} className={classes.requestbox}>

                <div className="form-group">
                    <label htmlFor='request'>Request For</label>
                    <select
                        onChange={requestChangeInputHandler}
                        onBlur={requestInputBlurHandler}
                        value={request}
                        className="form-control" >
                        <option value="Select">Select</option>
                        <option value="book">Book</option>
                        <option value="magzine">Magzine</option>
                        <option value="article">Article</option>
                    </select>
                    {requestInputIsInvalid && <p className={classes.errortext}> Required</p>}
                </div>
                <div className="form-group">
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
                </div>
                <div className="form-group">
                    <label htmlFor='author'>Author</label>
                    <input
                        type='author'
                        id='author'
                        value={author}
                        onChange={authorChangeInputHandler}
                        onBlur={authorInputBlurHandler}
                        className="form-control"
                    />
                    {authorInputIsInvalid && <p className={classes.errortext}> Required</p>}
                </div>

                <div className="form-group">
                    <label htmlFor='publisher'>Publisher</label>
                    <input
                        type='publisher'
                        id='publisher'
                        value={publisher}
                        onChange={publisherChangeInputHandler}
                        onBlur={publisherInputBlurHandler}
                        className="form-control"
                    />
                    {publisherInputIsInvalid && <p className={classes.errortext}> Required</p>}
                </div>
                <div> <button className={classes.sendbutton} onClick={formSubmitHandler}>send</button></div>
            </form>
        </div >
    );
}
export default Request;