import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { postReducer } from './reducers/post'

const rootReducer = combineReducers({
  post: postReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export default createStore(rootReducer, applyMiddleware(thunk))
