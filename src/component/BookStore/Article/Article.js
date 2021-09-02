import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import classes from './Article.module.css'

const Article = (props) => {
    const history = useHistory();
    const [articleName, setName] = useState('');
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
        if (articleName.trim() == '') {
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
        if (articleName.trim() == '') {
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

        if (articleName.trim().length == '') {
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
        formData.append('ArticlePdfFile', selectedFile);
        formData.append('ArticleImage', selectedImage);
        formData.append('ArticleName', articleName);
        formData.append('Author', author);
        formData.append('Publisher', publisher);
        console.log(formData)

        axios.post("http://localhost:8080/saveArticle", formData).
            then(res => {
                console.log(res)
                if (res.data.status == 401) {
                    alert(`${res.data.result.message}`);
                }
                if (res.data.status == 200) {
                    alert(`${res.data.result.articleName} upload successfully.....`);
                    history.push('/articleOverView');
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

    let fileName = 'all-coding-challenges (2).pdf'
    const download = () => {
        axios({

            url: `http://localhost:8080/downloadFile/${fileName}`,
            method: "GET",
            responseType: "blob"
        }
        ).
            then(res => {
                const url = window.URL.createObjectURL(
                    new Blob([res.data], {
                        type: res.headers['content-type']
                    })
                )
                const link = document.createElement('a');
                link.href = url;

                link.setAttribute('download', fileName);
                document.body.appendChild(link)
                link.click();

            }).catch(error => {
                alert(error)
            })
    }


    return (

        <div className={classes.articlecontainer} >
            <div className={classes.article}>
                <form onSubmit={fromSubmitHandler} className={classes.articlebox} >

                    <div className="form-group">
                        <label htmlFor='articleName'>Article Name</label>
                        <input
                            type='articleName'
                            id='articleName'
                            value={articleName}
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
                    <div className="form-group">
                        <label for="file">Click to upload book File</label>
                        <input type="file" name="file" onChange={changeHandler} />
                    </div>
                    <div className="form-group">
                        <label for="image">Click to upload image</label>
                        <input placeholder="Select Image" type="file" name="image" onChange={imageChangeHandler} />
                    </div>
                    <div>
                        <button className="btn btn-success">Add Article</button>
                    </div>


                </form>
            </div >
        </div >
    )
}
export default Article;