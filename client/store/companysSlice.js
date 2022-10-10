import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    companies: []
};

export const companysSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        getCompanies: (state, action) => {
            state.companies = [...state.companies, action.payload];
        },
        getCompanie: (state, action) => {
            state.companies = [action.payload];
        }
    }
});

export const { getCompanies, getCompanie } = companysSlice.actions;

export default companysSlice.reducer;