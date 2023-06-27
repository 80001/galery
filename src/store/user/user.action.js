import { createAction } from "../../utils/reducer.utils"
import { USER_ACTION_TYPES } from "./user.types"

export const setAuthIn = (auth) => createAction(USER_ACTION_TYPES.LOG_IN, auth)
export const setAuthOut = () => createAction(USER_ACTION_TYPES.LOG_OUT)