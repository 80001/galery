import { BLOG_ACTION_TYPES } from "./blog.types"

const INITIAL_STATE = {
    posts: [],
    postsMap: [],
    title: '',
    subtitle: '',
    img: '',
    text: '',
    id: '',
    modal: false,
}

export const BlogReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case BLOG_ACTION_TYPES.SET_POSTS:
            return {
                ...state,
                posts: payload
            }
        case BLOG_ACTION_TYPES.SET_POSTS_MAP:
            return {
                ...state,
                postsMap: payload
            }
        case BLOG_ACTION_TYPES.SET_POSTS_TITLE:
            return {
                ...state,
                title: payload
            }
        case BLOG_ACTION_TYPES.SET_POSTS_SUBTITLE:
            return {
                ...state,
                subtitle: payload
            }
        case BLOG_ACTION_TYPES.SET_POSTS_IMG:
            return {
                ...state,
                img: payload
            }
        case BLOG_ACTION_TYPES.SET_POSTS_TEXT:
            return {
                ...state,
                text: payload
            }
        case BLOG_ACTION_TYPES.SET_POSTS_ID:
            return {
                ...state,
                id: payload
            }
        case BLOG_ACTION_TYPES.SET_MODAL:
            return {
                ...state,
                modal: payload
            }
        default:
            return state
    }
}