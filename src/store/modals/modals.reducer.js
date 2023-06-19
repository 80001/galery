import { MODALS_ACTION_TYPES } from "./modals.types"

const INITIAL_STATE = {
    modal: false,
    photo: null,
    post: null,
    postId: null,
    postMap: null,
    photoId: null,
    photoMap: null,
    modalAuth: false,
    modalCreatePost: false,
    modalZoom: false,
    modalFullPost: false,
    modalEditPost: false,
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
        case MODALS_ACTION_TYPES.SET_AUTH_MODAL:
            return {
                ...state,
                modal: true,
                modalAuth: true
            }
        case MODALS_ACTION_TYPES.SET_CREATE_POST_MODAL:
            return {
                ...state,
                modal: true,
                modalCreatePost: true
            }
        case MODALS_ACTION_TYPES.SET_ZOOM_MODAL:
            return {
                ...state,
                modal: true,
                modalZoom: true,
                photo: payload,
                photoId: payload.id
            }
        case MODALS_ACTION_TYPES.SET_FULL_POST_MODAL:
            return {
                ...state,
                modal: true,
                modalFullPost: true,
                post: payload,
                postId: payload.id
            }
        case MODALS_ACTION_TYPES.SET_EDIT_POST_MODAL:
            return {
                ...state,
                modal: true,
                modalEditPost: true,
                post: payload,
                postId: payload.id
            }
        case MODALS_ACTION_TYPES.SET_MODAL:
            return {
                ...state,
                modal: false,
                modalAuth: false,
                modalCreatePost: false,
                modalZoom: false,
                modalFullPost: false,
                modalEditPost: false,
                photo: null,
                photoId: null,
                postId: null,
                post: null
            }
        default:
            return state
    }
}