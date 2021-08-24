import {applyMiddleware, combineReducers, createStore} from "redux";
import {postReducer} from "./reducers/post";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    post: postReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export default createStore(rootReducer, applyMiddleware(thunk))