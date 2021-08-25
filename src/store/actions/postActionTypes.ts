import {
  addPost,
  loadPosts,
  removePost,
  toggleBooked
} from '~/store/actions/postActions'

export type PostActionType =
  | ReturnType<typeof loadPosts>
  | ReturnType<typeof toggleBooked>
  | ReturnType<typeof removePost>
  | ReturnType<typeof addPost>
