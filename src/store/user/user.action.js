import { createAction } from "../../utils/reducer.utils"
import { USER_ACTION_TYPES } from "./user.types"

export const setAuthIn = (user) => createAction(USER_ACTION_TYPES.SET_AUTH_IN, user)
export const setAuthOut = () => createAction(USER_ACTION_TYPES.SET_AUTH_OUT)