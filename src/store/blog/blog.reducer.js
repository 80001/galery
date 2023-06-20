import { BLOG_ACTION_TYPES } from "./blog.types"

const INITIAL_STATE = {
    //postsMap для зберігання масиву постів, які можна перемикати в модалці
    postsMap: [],
    // сторінки в blog
    blogPage: 1,
    //додаткові сторінки в blog(коли додаєш фт на сторінку)
    blogMorePage: 1,
    // зміна подачі постів - сортування
    blogSorted: 'mixed',
}

export const BlogReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case BLOG_ACTION_TYPES.SET_POSTS_MAP:
            return {
                ...state,
                postsMap: payload
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
                blogSorted: payload,
                blogPage: 1,
                blogMorePage: 1
            }
        default:
            return state
    }
}