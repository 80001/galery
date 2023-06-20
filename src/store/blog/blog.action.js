import { createAction } from "../../utils/reducer.utils"
import { BLOG_ACTION_TYPES } from "./blog.types"

export const setPostsMap = (postsMap) => createAction(BLOG_ACTION_TYPES.SET_POSTS_MAP, postsMap)
export const setBlogPage = (blogPage) => createAction(BLOG_ACTION_TYPES.SET_BLOG_PAGE, blogPage)
export const setBlogMorePage = (moreBlogPage) => createAction(BLOG_ACTION_TYPES.SET_BLOG_MORE_PAGE, moreBlogPage)
export const setBlogSorted = (sorted) => createAction(BLOG_ACTION_TYPES.SET_BLOG_SORTED, sorted)
