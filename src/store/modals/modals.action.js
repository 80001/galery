import { createAction } from "../../utils/reducer.utils"
import { MODALS_ACTION_TYPES } from "./modals.types"

export const setPhoto = (photo) => createAction(MODALS_ACTION_TYPES.SET_PHOTO, photo)
export const setPhotoId = (photoId) => createAction(MODALS_ACTION_TYPES.SET_PHOTO_ID, photoId)
export const setPhotoMap = (photoMap) => createAction(MODALS_ACTION_TYPES.SET_PHOTO_MAP, photoMap)
export const setAuthorizationModal = (auth) => createAction(MODALS_ACTION_TYPES.SET_AUTHORIZATION, auth)
export const setCreatePostModal = (create) => createAction(MODALS_ACTION_TYPES.SET_CREATE_POST, create)
export const setZoomModal = (zoom) => createAction(MODALS_ACTION_TYPES.SET_ZOOM, zoom)
export const setFullPost = (full) => createAction(MODALS_ACTION_TYPES.SET_FULL_POST, full)