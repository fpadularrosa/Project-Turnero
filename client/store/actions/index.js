import {
    GET_COMPANIE,
    GET_COMPANIES,
    LOGIN,
    LOGOUT,
    NEW_APPOINTMENT
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
    return async (dispatch) => {
        const response = await (await window.fetch(`http://localhost:3000/companies/${name}`)).json();
        response.name ? dispatch({ type: GET_COMPANIE, payload: response }) : Swal.fire('Something went wrong', `${response.statusCode} - ${response.message}`, 'error');
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

export const postRegisterUser = async (user) => {
    try {
        const response = await fetch('http://localhost:3001/auth/register', 
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        if (response.ok) {
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
        }
    } catch (error) {
        Swal.fire(
            'Error',
            'An error occurred while registering.',
            'error'
        );
    }
}

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
                'Redirecting home...',
                'success'
            );
        } else Swal.fire('Something went wrong', '.', 'error');
    };
};

export const newAppointment = (dataAndCompanyDesired) => {
    return async (dispatch) => {
        const response = await (await window.fetch(`http://localhost:3000/appointment/new`, {
            method: "POST",
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(dataAndCompanyDesired)
        })).json();
        response.newAppointment ? Swal.fire('Your appointment is ready.', 'Thank u for the confidence', 'success') : Swal.fire('Something went wrong', `${response.statusCode} - ${response.message}`, 'error');
    };
};

export function userLogout(){
    return{
      type: LOGOUT
    };
};