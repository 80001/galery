import { GALLERY_ACTION_TYPES } from "./gallery.types"

export const INITIAL_STATE = {
    openModal: false,
    openPostModal: false,
}

export const GalleryReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case GALLERY_ACTION_TYPES.SET_OPEN_MODAL:
            return {
                ...state,
                openModal: payload
            }
        case GALLERY_ACTION_TYPES.SET_OPEN_POST_MODAL:
            return {
                ...state,
                openPostModal: payload
            }
        default:
            return state
    }
}