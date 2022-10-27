import { applyMiddleware, compose, legacy_createStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import reducer from "./reducers";

const middleware = [thunk];

const store = () => legacy_createStore(reducer, compose(applyMiddleware(...middleware)));

export const wrapper = createWrapper(store);