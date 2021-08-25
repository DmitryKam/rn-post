import { ThunkDispatch } from 'redux-thunk'
import * as FileSystem from 'expo-file-system'
import { PostDataType } from '~/data'
import { AppStateType } from '~/store'
import { PostActionType } from '~/store/actions/postActionTypes'
import { DB } from '~/db'
import {
  addPost,
  loadPosts,
  removePost,
  toggleBooked
} from '~/store/actions/postActions'

export const fetchPostData = () => async (
  dispatch: ThunkDispatch<AppStateType, unknown, PostActionType>
) => {
  const result = (await DB.getPosts()) as PostDataType[]
  dispatch(loadPosts(result))
}
export const createPost = (post: PostDataType) => async (
  dispatch: ThunkDispatch<AppStateType, unknown, PostActionType>
) => {
  const fileName: string = post.img.split('/').pop() as string

  const newPath = FileSystem.documentDirectory + fileName
  try {
    await FileSystem.moveAsync({
      to: newPath,
      from: post.img
    })
  } catch (e) {
    console.log('Error', e)
  }

  const payload = { ...post, img: newPath }

  const id = await DB.createPost(payload)
  payload.id = id as string
  dispatch(addPost(payload))
}
export const updateBooked = (post: PostDataType) => async (
  dispatch: ThunkDispatch<AppStateType, unknown, PostActionType>
) => {
  await DB.updatePost(post)
  dispatch(toggleBooked(post.id))
}
export const deletePost = (id: string) => async (
  dispatch: ThunkDispatch<AppStateType, unknown, PostActionType>
) => {
  await DB.removePost(id)
  dispatch(removePost(id))
}
