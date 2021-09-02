import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import Login from '../../component/Login/Login';
import Home from '../../component/Home/Home';
import Register from '../../component/Registration/Registration';
import ForgetPassword from '../../component/ForgetPassword/ForgetPassword';
import Book from '../BookStore/Book/Book';
import Magzine from '../BookStore/Magzine/Magzine';
import Article from '../BookStore/Article/Article';
import Students from '../Member/Students'
import Request from '../Request/Request'
import ArticleOverview from '../BookStore/Article/ArticleOverview'

import Librarian from '../librarian/Librarian';
import Customer from '../customer/Customer';

import BookOverview from '../BookStore/Book/BookOverview';
const BookRouting = () => {
  return (
    <Switch>

      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/librarian">
        <Librarian />
      </Route>

      <Route path="/customer">
        <Customer />
      </Route>

      <Route path="/register">
        <Register />
      </Route>

      <Route path="/forgetpassword">
        <ForgetPassword />
      </Route>


      <Route path="/students">
        <Students />
      </Route>
      <Route path="/bookOverview">
        <BookOverview />
      </Route>


      <Route path="/addBook">
        <Book />
      </Route>
      <Route path="/addMagzin">
        <Magzine />
      </Route>

      <Route path="/articleOverView">
        <ArticleOverview />
      </Route>

      <Route path="/addArticle">
        <Article />
      </Route>


      <Route path="/request">
        <Request />
      </Route>

    </Switch>

  )

}
export default BookRouting;