import { ACCOUNT_ACTION_TYPES } from "./account.types"

const INITIAL_STATE = {
    posts: { visible: false, params: {} },
    comments: { visible: false, params: {} },
}

export const AccountReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case ACCOUNT_ACTION_TYPES.SHOW_POSTS:
            return {
                [payload.name]: { visible: true, params: payload.params }
            }
        case ACCOUNT_ACTION_TYPES.SHOW_COMMENTS:
            return {
                [payload.name]: { visible: true, params: payload.params }
            }
        default:
            return state
    }
}