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
    blogPage: 1,
    blogMorePage: 1,
    blogSorted: 'mixed',
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
        case BLOG_ACTION_TYPES.SET_BLOG_PAGE:
            return {
                ...state,
                blogPage: payload
            }
        case BLOG_ACTION_TYPES.SET_BLOG_MORE_PAGE:
            return {
                ...state,
                blogMorePage: payload
            }
        case BLOG_ACTION_TYPES.SET_BLOG_SORTED:
            return {
                ...state,
                blogSorted: payload
            }
        default:
            return state
    }
}