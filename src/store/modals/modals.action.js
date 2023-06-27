import { createAction } from "../../utils/reducer.utils"
import { MODALS_ACTION_TYPES } from "./modals.types"

export const openModal = (name, params) =>
    createAction(MODALS_ACTION_TYPES.OPEN_MODAL, { name: name, params: params || {} })
export const closeModal = (name) =>
    createAction(MODALS_ACTION_TYPES.CLOSE_MODAL, { name })