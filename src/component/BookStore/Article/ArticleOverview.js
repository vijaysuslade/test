import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../../store/auth-context';
import { useHistory } from "react-router-dom";

import classes from './ArticleOverview.module.css';
import axios from 'axios';

const ArticleOverview = (props) => {
    const [articles, setArticle] = useState([]);
    const [filter, setFilter] = useState('');
    let context = useContext(AuthContext);
    const history = useHistory();
    useEffect(() => {
        axios.get("http://localhost:8080/getArticles").
            then(res => {
                setArticle(res.data.result);
                console.log(res.data.result)
            }).catch(error => {
                alert(error)
            })
    }, [])

    const downloadPdfHandler = (articleId, articleName) => {
        let studentId = localStorage.getItem('id');
        axios({
            url: `http://localhost:8080/downloadArticleFile/${articleId}/${studentId}`,
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
                link.setAttribute('download', articleName);
                document.body.appendChild(link)
                link.click();
            }).catch(error => {
                alert(error)
            })
    }
    const serchHandler = (event) => {
        setFilter(event.target.value);
    }
    const filtredBook = articles.filter(article => {
        return article.articleName.toLowerCase().includes(filter.toLowerCase()) ||
            article.author.toLowerCase().includes(filter.toLowerCase());
    });
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
                        history.push("/addArticle");
                    }}>+</button>}
                </div>
            </div>
            <div className={classes.books}>
                {
                    filtredBook.map((article) => (
                        <div className={classes.card} key={article.aid}>
                            <img className={classes.img} src={article.imageUrl} alt="No  image" />
                            <h2>{article.articleName}</h2>
                            <h3>{article.author}</h3>
                            {context.role == 'Student' && <button onClick={() => downloadPdfHandler(article.aid, article.articleName)} className="btn btn-success">Download</button>}
                            <div>
                                {context.role == 'admin' && <button className="btn btn-success mr-4">Edit</button>}
                                {context.role == 'admin' && <button className="btn btn-danger ml-5">Delete</button>}
                            </div>
                        </div>
                    ))
                }
            </div >
        </div >
    )
}
export default ArticleOverview



