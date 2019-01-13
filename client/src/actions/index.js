import { AUTH_USER, AUTH_ERROR, SET_USER } from './types';

export const login = (data, callback) => dispatch => {
  fetch('/auth/signin', {
    method: 'POST', 
    headers: {"Content-Type": "application/json"}, 
    mode: "cors", 
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        dispatch({ type: AUTH_USER, payload: data });
      //  dispatch({ type: SET_USER, payload})
        localStorage.setItem('token', data.token)
        callback();
      })
    .catch(err => {
      dispatch({ type: AUTH_ERROR, payload: 'Error signing in' });
    })
    };

export const signup = (data, callback) => dispatch => {
  fetch('/auth/signup', {
    method: 'POST', 
    headers: {"Content-Type": "application/json"}, 
    mode: "cors", 
    body: JSON.stringify(data)
  })
    .then(res => res.json()
    .then(data => {
      console.log(data);
      dispatch({ type: AUTH_USER, payload: data });
      localStorage.setItem('token', data.token)
      callback();
    })
    .catch(err => {
      dispatch({ type: AUTH_ERROR, payload: 'Error signing in' });
    })
  )  
}

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  }
}

export const fetchUser = () => dispatch => {
  const config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
    }
  };
  fetch('/currentuser',
    config
  )
  .then(res => res.json())
    .then(data => {
      console.log('fetching user', data)
      dispatch({ type: AUTH_USER, payload: data });
      dispatch({type: SET_USER, payload: data.user })
      localStorage.setItem('token', data.token);
    })
  .catch(error => {
    console.log(error);
  });
};
