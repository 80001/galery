import { MODALS_ACTION_TYPES } from "./modals.types"

const INITIAL_STATE = {
    authorization: false,
    createPost: false,
    zoom: false,
}
export const ModalReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case MODALS_ACTION_TYPES.SET_AUTHORIZATION:
            return {
                ...state,
                authorization: payload
            }
        case MODALS_ACTION_TYPES.SET_CREATE_POST:
            return {
                ...state,
                createPost: payload
            }
        case MODALS_ACTION_TYPES.SET_ZOOM:
            return {
                ...state,
                zoom: payload
            }
        default:
            return state
    }
}