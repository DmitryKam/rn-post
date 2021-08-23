import {ACTIONS, PostActionType} from "../actions/postActions";
import {PostDataType} from "../../data";

type InitialStateType = {
    allPosts: Array<PostDataType>
    bookedPosts: Array<PostDataType>
}

const initialState = {
    allPosts: [],
    bookedPosts: []
}

export const postReducer = (state: InitialStateType = initialState, action: PostActionType): InitialStateType => {
    switch (action.type) {
        case ACTIONS.LOAD_POSTS: {
            return {
                ...state,
                allPosts: action.payload.data,
                bookedPosts: action.payload.data.filter(post => post.booked)
            }
        }
        case ACTIONS.TOGGLE_BOOKED: {
            const allPosts = state.allPosts.map(post => {
                if (post.id === action.payload.id) {
                    post.booked = !post.booked
                }
                return post
            })
            return {
                ...state, allPosts: allPosts, bookedPosts: allPosts.filter(post => post.booked)
            }
        }
        case ACTIONS.REMOVE_POST: {
            return {
                ...state,
                allPosts: state.allPosts.filter(post => post.id !== action.payload.id),
                bookedPosts: state.bookedPosts.filter(post => post.id !== action.payload.id)
            }
        }
        case ACTIONS.ADD_POST: {
            return {
                ...state, allPosts: [{
                    id: Date.now().toString(),
                    img: action.payload.img,
                    text: action.payload.text,
                    date: new Date().toJSON(),
                    booked: false,
                }, ...state.allPosts]
            }
        }

        default:
            return state

    }
}