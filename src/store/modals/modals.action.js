import { createAction } from "../../utils/reducer.utils"
import { MODALS_ACTION_TYPES } from "./modals.types"

export const setPhoto = (photo) => createAction(MODALS_ACTION_TYPES.SET_PHOTO, photo)
export const setPhotoId = (photoId) => createAction(MODALS_ACTION_TYPES.SET_PHOTO_ID, photoId)
export const setPost = (post) => createAction(MODALS_ACTION_TYPES.SET_POST, post)
export const setPostId = (postId) => createAction(MODALS_ACTION_TYPES.SET_POST_ID, postId)
export const setPostMap = (postMap) => createAction(MODALS_ACTION_TYPES.SET_POST_MAP, postMap)
export const setPhotoMap = (photoMap) => createAction(MODALS_ACTION_TYPES.SET_PHOTO_MAP, photoMap)
export const setAuthModal = (auth) => createAction(MODALS_ACTION_TYPES.SET_AUTH_MODAL, auth)
export const setCreatePostModal = (create) => createAction(MODALS_ACTION_TYPES.SET_CREATE_POST_MODAL, create)
export const setZoomModal = (zoom) => createAction(MODALS_ACTION_TYPES.SET_ZOOM_MODAL, zoom)
export const setFullPost = (full) => createAction(MODALS_ACTION_TYPES.SET_FULL_POST_MODAL, full)
export const setEditPost = (edit) => createAction(MODALS_ACTION_TYPES.SET_EDIT_POST_MODAL, edit)
export const setModal = (modal) => createAction(MODALS_ACTION_TYPES.SET_MODAL, modal)