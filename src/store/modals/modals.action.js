import { createAction } from "../../utils/reducer.utils"
import { MODALS_ACTION_TYPES } from "./modals.types"

export const setAuthorizationModal = (auth) => createAction(MODALS_ACTION_TYPES.SET_AUTHORIZATION, auth)
export const setCreatePostModal = (create) => createAction(MODALS_ACTION_TYPES.SET_CREATE_POST, create)
export const setZoomModal = (zoom) => createAction(MODALS_ACTION_TYPES.SET_ZOOM, zoom)