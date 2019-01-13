import { AUTH_USER, AUTH_ERROR } from './types';

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
        localStorage.setItem('token', data.token)
        callback();
      });
    };


//   .catch(function (error) {
//     dispatch({ type: AUTH_ERROR, payload: 'FILL IN BETTER ERROR HANDLING HERE' });
//   });
// };

