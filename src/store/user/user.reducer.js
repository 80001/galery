import { USER_ACTION_TYPES } from "./user.types"

const INITIAL_STATE = {
    user: null,
    auth: false,
}
export const UserReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case USER_ACTION_TYPES.SET_AUTH_IN:
            return {
                auth: true,
                user: payload
            }
        case USER_ACTION_TYPES.SET_AUTH_OUT:
            return {
                auth: false,
                user: null
            }
        default:
            return state
    }
}