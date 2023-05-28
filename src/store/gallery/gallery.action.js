import { createAction } from "../../utils/reducer.utils";
import { GALLERY_ACTION_TYPES } from "./gallery.types";


export const setOpenModal = (openModal) => createAction(GALLERY_ACTION_TYPES.SET_OPEN_MODAL, openModal)
export const setOpenPostModal = (openPostModal) => createAction(GALLERY_ACTION_TYPES.SET_OPEN_POST_MODAL, openPostModal)