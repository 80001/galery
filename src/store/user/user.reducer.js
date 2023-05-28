import { USER_ACTION_TYPES } from "./user.types"

const INITIAL_STATE = {
    user: null,
    userName: null,
}
export const UserReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case USER_ACTION_TYPES.SET_USER:
            return {
                ...state,
                user: payload
            }
        case USER_ACTION_TYPES.SET_NAME:
            return {
                ...state,
                userName: payload
            }
        default:
            return state
    }
}