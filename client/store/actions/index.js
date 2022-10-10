import {
    GET_COMPANIE,
    GET_COMPANIES
} from '../types.js';

export const getCompanies = () => {
    return (dispatch) => {
        fetch('http://localhost:3000/companies')
        .then(companys => companys.json())
        .then(res => dispatch({ type: GET_COMPANIES, payload: res }))
        .catch(err => dispatch({ type: GET_COMPANIES, payload:  err.toString()}))
    };
};

export const getCompanie = (name) => {
    return (dispatch) => {
        fetch(`http://localhost:3000/companies/${name}`)
        .then(company => company.json())
        .then(res => dispatch({ type: GET_COMPANIE, payload: res }))
        .catch(err => dispatch({ type: GET_COMPANIE, payload:  err.toString() }))
    };
};