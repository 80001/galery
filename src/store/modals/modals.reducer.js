import { MODALS_ACTION_TYPES } from "./modals.types"

const INITIAL_STATE = {
    photo: null,
    post: null,
    postId: null,
    postMap: null,
    photoId: null,
    photoMap: null,
    authorization: false,
    createPost: false,
    zoom: false,
    fullPost: false,
}
export const ModalReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case MODALS_ACTION_TYPES.SET_PHOTO:
            return {
                ...state,
                photo: payload
            }
        case MODALS_ACTION_TYPES.SET_PHOTO_ID:
            return {
                ...state,
                photoId: payload
            }
        case MODALS_ACTION_TYPES.SET_POST:
            return {
                ...state,
                post: payload
            }
        case MODALS_ACTION_TYPES.SET_POST_ID:
            return {
                ...state,
                postId: payload
            }
        case MODALS_ACTION_TYPES.SET_POST_MAP:
            return {
                ...state,
                postMap: payload
            }
        case MODALS_ACTION_TYPES.SET_PHOTO_MAP:
            return {
                ...state,
                photoMap: payload
            }
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
        case MODALS_ACTION_TYPES.SET_FULL_POST:
            return {
                ...state,
                fullPost: payload
            }
        default:
            return state
    }
}