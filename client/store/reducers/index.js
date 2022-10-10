import {
    GET_COMPANIES,
    GET_COMPANIE
} from '../types';

const initialState = {
    companies: []
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
        default:
            return state;
    }
};

export default reducer;