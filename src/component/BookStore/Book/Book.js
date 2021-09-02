import React, { useState, } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import classes from './Book.module.css';

const Book = (props) => {
  const history = useHistory();
  const [bookName, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(true);
  const [nameTouched, setNameTouched] = useState(false);

  const [author, setAuthor] = useState('');
  const [authorIsValid, setAuthorIsValid] = useState(true);
  const [authorTouched, setAuthorTouched] = useState(false);

  const [publisher, setPublisher] = useState('');
  const [publisherIsValid, setPublisherIsValid] = useState(true);
  const [publisherTouched, setPublisherTouched] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const nameInputIsInvalid = !nameIsValid && nameTouched;
  const authorInputIsInvalid = !authorIsValid && authorTouched;
  const publisherInputIsInvalid = !publisherIsValid && publisherTouched;

  const nameChangeInputHandler = (event) => {
    event.preventDefault();

    setName(event.target.value);
    if (bookName.trim() == '') {
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

  const nameInputBlurHandler = (event) => {
    event.preventDefault();
    setNameTouched(true);
    if (bookName.trim() == '') {
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

  const fromSubmitHandler = (event) => {
    event.preventDefault();
    setNameTouched(true);
    setAuthorTouched(true);
    setPublisherTouched(true);

    if (bookName.trim().length == '') {
      setNameIsValid(false);
      return
    } else if (author.trim().length == '') {
      setAuthorIsValid(false);
      return
    } else if (publisher.trim().length == '') {
      setPublisherIsValid(false);
      return
    } else {
      setNameIsValid(true);
      setAuthorIsValid(true);
      setPublisherIsValid(true);
    }

    const formData = new FormData();
    formData.append('BookPdfFile', selectedFile);
    formData.append('BookImage', selectedImage);
    formData.append('BookName', bookName);
    formData.append('Author', author);
    formData.append('Publisher', publisher);
    axios.post("http://localhost:8080/saveBook", formData).
      then(res => {
        console.log()
        if (res.data.status == 401) {
          alert(`${res.data.result.message}`);
        }
        if (res.data.status == 200) {
          alert(`${res.data.result.bookName} upload successfully.....`);
          history.push('/bookOverview');
        }
      }).catch(error => {
        alert(error)
      })
  }

  const changeHandler = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file)
  }

  const imageChangeHandler = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  }

  return (
    <div className={classes.bookcontainer}>
      <div className={classes.book} >
        <form onSubmit={fromSubmitHandler} className={classes.bookbox} >

          <div className="form-group">
            <label htmlFor='bookName'>BookName</label>
            <input
              type='bookName'
              id='bookName'
              value={bookName}
              onChange={nameChangeInputHandler}
              onBlur={nameInputBlurHandler}
              className="form-control"
            />
            {nameInputIsInvalid && <p className={classes.errortext}> Required</p>}
            <div />
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

            <div className="form-group">
              <label for="file">Click to upload book File</label>
              <input type="file" name="file" onChange={changeHandler} />
            </div>

            <div className="form-group">
              <label for="image">Click to upload image</label>
              <input placeholder="Select Image" type="file" name="image" onChange={imageChangeHandler} />
            </div>
            <div>
              <button className="btn btn-success">Add Book</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Book;