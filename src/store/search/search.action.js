import { createAction } from "../../utils/reducer.utils"
import { SEARCH_ACTION_TYPES } from "./search.types"

export const setSearch = (search) => createAction(SEARCH_ACTION_TYPES.SET_SEARCH, search)
export const setHistory = (history) => createAction(SEARCH_ACTION_TYPES.SET_HISTORY, history)
export const setShowComments = (showComments) => createAction(SEARCH_ACTION_TYPES.SET_SHOW_COMMENTS, showComments)
export const setWriteComments = (writeComments) => createAction(SEARCH_ACTION_TYPES.SET_WRITE_COMMENTS, writeComments)
export const setOrientation = (orientation) => createAction(SEARCH_ACTION_TYPES.SET_ORIENTATION, orientation)
export const setPage = (page) => createAction(SEARCH_ACTION_TYPES.SET_PAGE, page)
export const setPerPage = (perPage) => createAction(SEARCH_ACTION_TYPES.SET_PER_PAGE, perPage)
export const setIsLoading = (isLoading) => createAction(SEARCH_ACTION_TYPES.SET_IS_LOADING, isLoading)
export const setView = (view) => createAction(SEARCH_ACTION_TYPES.SET_VIEW, view)
export const setClassChange = (classChange) => createAction(SEARCH_ACTION_TYPES.SET_CLASS_CHANGE, classChange)