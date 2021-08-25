import { PostDataType } from '~/data'
import { ACTIONS } from '~/store/types'

export const loadPosts = (data: Array<PostDataType>) =>
  ({
    type: ACTIONS.LOAD_POSTS,
    payload: {
      data
    }
  } as const)

export const toggleBooked = (id: string) =>
  ({
    type: ACTIONS.TOGGLE_BOOKED,
    payload: {
      id
    }
  } as const)

export const removePost = (id: string) =>
  ({
    type: ACTIONS.REMOVE_POST,
    payload: {
      id
    }
  } as const)

export const addPost = (post: PostDataType) =>
  ({
    type: ACTIONS.ADD_POST,
    payload: {
      post
    }
  } as const)
