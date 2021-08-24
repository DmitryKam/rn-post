import * as FileSystem from 'expo-file-system';

import {ThunkDispatch} from "redux-thunk";
import {DB} from "../../db";
import {PostDataType} from "../../data";

export enum ACTIONS {
    LOAD_POSTS = 'LOAD_POSTS',
    TOGGLE_BOOKED = 'TOGGLE_BOOKED',
    REMOVE_POST = 'REMOVE_POST',
    ADD_POST = 'ADD_POST'
}


export const loadPosts = (data: Array<PostDataType>) => ({
    type: ACTIONS.LOAD_POSTS,
    payload: {
        data
    }

}) as const


export const toggleBooked = (id: string) => ({
    type: ACTIONS.TOGGLE_BOOKED,
    payload: {
        id
    }

}) as const

export const removePost = (id: string) => ({
    type: ACTIONS.REMOVE_POST,
    payload: {
        id
    }

}) as const

export const addPost = (post: PostDataType) => ({
    type: ACTIONS.ADD_POST,
    payload: {
        post
    }
}) as const

export type PostActionType = ReturnType<typeof loadPosts>
    | ReturnType<typeof toggleBooked>
    | ReturnType<typeof removePost>
    | ReturnType<typeof addPost>


export const fetchPostData = () => async (dispatch: ThunkDispatch<{}, any, PostActionType>) => {
    const result = await DB.getPosts() as PostDataType[]
    dispatch(loadPosts(result))
}


export const createPost = (post: PostDataType) => async (dispatch: ThunkDispatch<{}, any, PostActionType>) => {
    console.log('POST', post)
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

    const payload = {...post, img: newPath}

    const id = await DB.createPost(payload)

    if (typeof id === "string") {
        payload.id = id
    }
    dispatch(addPost(payload))
}

export const updateBooked = (post: PostDataType) => async (dispatch: ThunkDispatch<{}, any, PostActionType>) => {
    await DB.updatePost(post)
    dispatch(toggleBooked(post.id))
}

export const deletePost = (id: string) => async (dispatch: ThunkDispatch<{}, any, PostActionType>) => {
    await DB.removePost(id)
    dispatch(removePost(id))
}
