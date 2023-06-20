import { USER_ACTION_TYPES } from "./user.types"

const INITIAL_STATE = {
    auth: {}
}
export const UserReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case USER_ACTION_TYPES.LOG_IN:
            return {
                auth: payload
            }
        case USER_ACTION_TYPES.LOG_OUT:
            return {
                auth: null
            }
        default:
            return state
    }
}