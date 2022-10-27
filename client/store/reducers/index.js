import {
    GET_COMPANIES,
    GET_COMPANIE,
    LOGIN,
    LOGOUT
} from '../types';
const initialState = {
    companies: [],
    user: null
};
const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_COMPANIES:
            return {
                ...state,
                companies: action.payload
            }
        case GET_COMPANIE:
            return {
                ...state,
                companies: [action.payload]
            }
        case LOGIN: 
            return {
                ...state,
                user: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
};

export default reducer;