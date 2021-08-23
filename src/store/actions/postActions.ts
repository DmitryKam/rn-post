import {DATA, PostDataType} from "../../data";

export enum ACTIONS {
    LOAD_POSTS = 'LOAD_POSTS',
    TOGGLE_BOOKED = 'TOGGLE_BOOKED',
    REMOVE_POST = 'REMOVE_POST',
    ADD_POST = 'ADD_POST'
}


export const loadPosts = () => ({
    type: ACTIONS.LOAD_POSTS,
    payload: {
        data: DATA
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

export const addPost = (text: string, image: string) => ({
    type: ACTIONS.ADD_POST,
    payload: {
        img: image,
        text: text,
    }
}) as const

export
type PostActionType = ReturnType<typeof loadPosts>
    | ReturnType<typeof toggleBooked>
    | ReturnType<typeof removePost>
    | ReturnType<typeof addPost>


