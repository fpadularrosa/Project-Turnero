import {
    GET_COMPANIE,
    GET_COMPANIES,
    LOGIN,
    LOGOUT
} from '../types.js';
import Swal from 'sweetalert2';
export const getCompanies = () => {
    return (dispatch) => {
        window.fetch('http://localhost:3000/companies')
        .then(companys => companys.json())
        .then(res => dispatch({ type: GET_COMPANIES, payload: res }))
        .catch(err => dispatch({ type: GET_COMPANIES, payload:  err.toString()}))
    };
};

export const getCompanie = (name) => {
    return (dispatch) => {
        window.fetch(`http://localhost:3000/companies/${name}`)
        .then(company => company.json())
        .then(res => dispatch({ type: GET_COMPANIE, payload: res }))
        .catch(err => dispatch({ type: GET_COMPANIE, payload:  err.toString() }))
    };
};

export const postTurn = (turn) => {
    return (dispatch) => {
        window.fetch('http://localhost:3000/turns/new', 
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(turn)
        });
    };
};

export const postRegisterUser = (user) => {
    const response = window.fetch('http://localhost:3000/auth/register', 
    {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    if(response.ok){
        Swal.fire(
            'Good job!',
            'Registered successfully.',
            'success'
        );
    } else {
        Swal.fire(
            'Something went wrong',
            '.',
            'error'
        );
    };
};

export const postLogin = (credentials) => {
    return async (dispatch) => {
        const response = await (await window.fetch(`http://localhost:3000/auth/login`, {
            method: "POST",
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(credentials)
        })).json();
        if(response.user){
            window.localStorage['loggedUser'] = JSON.stringify(response);
            dispatch({ type: LOGIN, payload: response });
            Swal.fire(
                'Good job!',
                'Logged succesfully.',
                'success'
            );
        } else Swal.fire('Something went wrong', '.', 'error');
    };
};

export function userLogout(){
    return{
      type: LOGOUT
    };
};