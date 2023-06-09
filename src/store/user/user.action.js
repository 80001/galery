import { createAction } from "../../utils/reducer.utils"
import { USER_ACTION_TYPES } from "./user.types"

export const setUser = (user) => createAction(USER_ACTION_TYPES.SET_USER, user)
export const setUserName = (userName) => createAction(USER_ACTION_TYPES.SET_NAME, userName)
export const setUserImage = (userImage) => createAction(USER_ACTION_TYPES.SET_IMAGE, userImage)