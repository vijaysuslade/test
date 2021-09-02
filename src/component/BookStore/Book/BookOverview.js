import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../../store/auth-context';
import { useHistory } from "react-router-dom";

import classes from './BookOverview.module.css';
import axios from 'axios';
const BookOverview = (props) => {
    const [books, setBooks] = useState([]);
    const [filter, setFilter] = useState('');
    let context = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:8080/getBooks").
            then(res => {
                setBooks(res.data.result);
                console.log(res.data.result)
            }).catch(error => {
                alert(error)
            })
    }, [])

    const downloadPdfHandler = (bookName, bookId) => {
        let studentId = localStorage.getItem('id');
        axios({
            url: `http://localhost:8080/downloadFile/${bookId}/${studentId}`,
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
                link.setAttribute('download', bookName);
                document.body.appendChild(link)
                link.click();
            }).catch(error => {
                alert(error)
            })
    }

    const serchHandler = (event) => {
        setFilter(event.target.value);
    }
    const filtredBook = books.filter(book => {
        return book.bookName.toLowerCase().includes(filter.toLowerCase()) ||
            book.author.toLowerCase().includes(filter.toLowerCase());
    });

    const deleteBook = (bookId) => {
        let studentId = localStorage.getItem('id');
        axios({
            url: `http://localhost:8080/deleteBook/${bookId}`,
            method: "GET",
        }
        ).then(res => { console.log("okkkk") })
    }

    return (
        <div className={classes.booksOverviewcontainer}>
            <div className={classes.addBookAction}>
                <div className={classes.serachbox}>
                    <input
                        type="text"
                        value={filter}
                        onChange={serchHandler}
                        placeholder="Search Book...."
                        className="form-control" />
                </div>
                <div className={classes.addbook}>
                    {context.role == 'admin' && <button className="btn btn-primary" onClick={() => {
                        history.push("/addBook");
                    }}>+</button>}
                </div>

            </div>

            <div className={classes.books}>
                {
                    filtredBook.map((book) => (
                        <div className={classes.card} key={book.id}>
                            <img className={classes.img} src={book.imageUrl} alt="No  image" />
                            <h3>{book.bookName}</h3>
                            <h3>{book.author}</h3>
                            {context.role == 'Student' && <button onClick={() => downloadPdfHandler(book.bookName, book.id)} className="btn btn-success">Download</button>}
                            <div>
                                {context.role == 'admin' && <button className="btn btn-success mr-4">Edit</button>}
                                {context.role == 'admin' && <button
                                    className="btn btn-danger ml-5"
                                    onClick={() => deleteBook(book.id)}
                                >Delete</button>}
                            </div>
                        </div>
                    ))
                }
            </div >
        </div >
    )
}

export default BookOverview



