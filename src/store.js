import {statesReducer} from "./reducers";
import {combineReducers, createStore} from "redux";

export const initStore = () => {
    return createStore(
        combineReducers({
            states: statesReducer
        })
    )
};