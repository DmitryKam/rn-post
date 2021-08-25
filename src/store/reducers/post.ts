import { PostDataType } from '~/data'
import { ACTIONS } from '~/store/types'
import { PostActionType } from '~/store/actions/postActionTypes'

type InitialStateType = {
  allPosts: Array<PostDataType>
  bookedPosts: Array<PostDataType>
  loading: boolean
}

const initialState = {
  allPosts: [],
  bookedPosts: [],
  loading: true
}

export const postReducer = (
  state: InitialStateType = initialState,
  action: PostActionType
): InitialStateType => {
  switch (action.type) {
    case ACTIONS.LOAD_POSTS: {
      return {
        ...state,
        allPosts: action.payload.data,
        bookedPosts: action.payload.data.filter(post => post.booked),
        loading: false
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
        ...state,
        allPosts,
        bookedPosts: allPosts.filter(post => post.booked)
      }
    }
    case ACTIONS.REMOVE_POST: {
      return {
        ...state,
        allPosts: state.allPosts.filter(post => post.id !== action.payload.id),
        bookedPosts: state.bookedPosts.filter(
          post => post.id !== action.payload.id
        )
      }
    }
    case ACTIONS.ADD_POST: {
      return {
        ...state,
        allPosts: [action.payload.post, ...state.allPosts]
      }
    }

    default:
      return state
  }
}
