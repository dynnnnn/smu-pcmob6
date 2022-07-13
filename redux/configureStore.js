import { combineReducers, createStore } from "redux";
import blogAuthReducer from "./ducks/blogAuth";
import accountPrefReducer from "./ducks/accountPref";
import addPicReducer from "./ducks/upload";

const reducer = combineReducers({ 
    auth: blogAuthReducer,
accountPrefs: accountPrefReducer,
addpic: addPicReducer});

const store = createStore(reducer);

export default store;