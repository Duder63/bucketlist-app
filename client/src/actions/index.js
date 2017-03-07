import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
  AUTH_USER, 
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_POSTS,
  FETCH_POST,
  DELETE_POST
 } from './types';
import authReducer from '../reducers/auth_reducer';

export const CREATE_POSTS = 'CREATE_POSTS';

//const ROOT_URL = 'http://rest.learncode.academy/api/paul';
const ROOT_URL = 'http://localhost:3000';

var config = {
  headers: { authorization: localStorage.getItem('token') }
}

export function signupUser({ email, password }){
  return function(dispatch){
    axios.post(`${ROOT_URL}/signup`, {email, password})
      .then(response => {
        //This only kick-starts if the request was good...
        //We now update the sate to indicate authenticated user
        dispatch({ type: AUTH_USER });
        //This will put the token in localStorage. It's safe!!
        localStorage.setItem('token', response.data.token);
        //This sends us off to the /signin view.
        browserHistory.push('/signin');
    })
      .catch(response => dispatch(authError(response.data.error)));

  }
}

export function signinUser({ email, password }){
  return function(dispatch){
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then(response => {
        //This only kick-starts if the request was good...
        //We now update the sate to indicate authenticated user
        dispatch({ type: AUTH_USER });
        //This will put the token in localStorage. It's safe!!
        localStorage.setItem('token', response.data.token);
        //This sends us off to the /newitem view.
        browserHistory.push('/newitem');
    })
      .catch(response => dispatch(authError("Bad login info")));

  }
}

//purpose of type is to catch unauth_user case.
//flips auth flag to false & there won't be any links associated with them
//other thing to do is get rid of token
export function signoutUser(){
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function createPost(props){
  return function(dispatch){
    axios.post(`${ROOT_URL}/newitem`, {props}, config )
    .then(request => {
      dispatch({
        type: CREATE_POSTS,
        payload: request        
      });
      browserHistory.push('/items');
    });
  }
}  

export function fetchPosts(id){
  return function(dispatch){
    axios.get(`${ROOT_URL}/items/`, config)
    .then( (response) => {
      console.log("Response", response)
      dispatch({
        type: FETCH_POSTS,
        payload: response
      });
    });
  }
}

export function fetchPost(id){
  return function(dispatch){
    axios.get(`${ROOT_URL}/items/${id}`, config)
    .then( (response) => {
      console.log("Response", response)
      dispatch({
        type: FETCH_POST,
        payload: response
      });
    });
  }
}

export function deletePost(id){
  return function(dispatch){
    axios.delete(`${ROOT_URL}/items/${id}`, config)
      .then( (response) => {
        dispatch({
          type: DELETE_POST,
          payload: response
        });
        browserHistory.push('/items');
      });
  }
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

