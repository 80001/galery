import { createAction } from "../../utils/reducer.utils"
import { BLOG_ACTION_TYPES } from "./blog.types"

export const setPosts = (posts) => createAction(BLOG_ACTION_TYPES.SET_POSTS, posts)
export const setPostsMap = (postsMap) => createAction(BLOG_ACTION_TYPES.SET_POSTS_MAP, postsMap)
export const setTitle = (title) => createAction(BLOG_ACTION_TYPES.SET_POSTS_TITLE, title)
export const setSubtitle = (subtitle) => createAction(BLOG_ACTION_TYPES.SET_POSTS_SUBTITLE, subtitle)
export const setImg = (img) => createAction(BLOG_ACTION_TYPES.SET_POSTS_IMG, img)
export const setText = (text) => createAction(BLOG_ACTION_TYPES.SET_POSTS_TEXT, text)
export const setId = (id) => createAction(BLOG_ACTION_TYPES.SET_POSTS_ID, id)
export const setModal = (modal) => createAction(BLOG_ACTION_TYPES.SET_MODAL, modal)
export const setBlogPage = (blogPage) => createAction(BLOG_ACTION_TYPES.SET_BLOG_PAGE, blogPage)
export const setBlogMorePage = (moreBlogPage) => createAction(BLOG_ACTION_TYPES.SET_BLOG_MORE_PAGE, moreBlogPage)
export const setBlogSorted = (sorted) => createAction(BLOG_ACTION_TYPES.SET_BLOG_SORTED, sorted)
