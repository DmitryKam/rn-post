import {combineReducers, createStore} from "redux";
import {postReducer} from "./reducers/post";

const rootReducer = combineReducers({
    post: postReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export default createStore(rootReducer)