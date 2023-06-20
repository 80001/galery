import { MODALS_ACTION_TYPES } from "./modals.types"


const INITIAL_STATE = {
    auth: { visible: false, params: {} },
    create: { visible: false, params: {} },
    zoom: { visible: false, params: {} },
    full: { visible: false, params: {} },
    edit: { visible: false, params: {} },
}
export const ModalReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case MODALS_ACTION_TYPES.OPEN_MODAL:
            return {
                ...state,
                [payload.name]: { visible: true, params: payload.params }
            }
        case MODALS_ACTION_TYPES.CLOSE_MODAL:
            return {
                ...state,
                [payload.name]: { visible: false, params: {} }
            }
        default:
            return state
    }
}