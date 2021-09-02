import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../../store/auth-context';
import { useHistory } from "react-router-dom";

import classes from './MagzineOverview.module.css';
import axios from 'axios';

const MagzineOverview = (props) => {
    const [magzines, setMagzine] = useState([]);
    const [filter, setFilter] = useState('');
    let context = useContext(AuthContext);
    const history = useHistory();
    useEffect(() => {
        axios.get("http://localhost:8080/getMagzines").
            then(res => {
                setMagzine(res.data.result);
                console.log(res.data.result)
            }).catch(error => {
                alert(error)
            })
    }, [])

    const downloadPdfHandler = (magzineId, magzineName) => {
        let studentId = localStorage.getItem('id');
        axios({
            url: `http://localhost:8080/downloadMagzineFile/${magzineId}/${studentId}`,
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
                link.setAttribute('download', magzineName);
                document.body.appendChild(link)
                link.click();
            }).catch(error => {
                alert(error)
            })
    }
    const serchHandler = (event) => {
        setFilter(event.target.value);
    }
    const filtredBook = magzines.filter(magzine => {
        return magzine.magzineName.toLowerCase().includes(filter.toLowerCase()) ||
            magzine.author.toLowerCase().includes(filter.toLowerCase());
    });
    return (
        <div className={classes.magzinesOverviewcontainer}>
            <div className={classes.addMagzineAction}>
                <div className={classes.serachbox}>
                    <input
                        type="text"
                        value={filter}
                        onChange={serchHandler}
                        placeholder="Search Magzine...."
                        className="form-control" />
                </div>
                <div className={classes.addbook}>
                    {context.role == 'admin' && <button className="btn btn-primary" onClick={() => {
                        history.push("/addMagzine");
                    }}>+</button>}
                </div>
            </div>
            <div className={classes.books}>
                {
                    filtredBook.map((magzine) => (
                        <div className={classes.card} key={magzine.aid}>
                            <img className={classes.img} src={magzine.imageUrl} alt="No  image" />
                            <h2>{magzine.magzineName}</h2>
                            <h3>{magzine.author}</h3>
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
    );
}
export default MagzineOverview



