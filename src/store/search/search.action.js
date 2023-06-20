import { createAction } from "../../utils/reducer.utils"
import { SEARCH_ACTION_TYPES } from "./search.types"

export const setSearch = (search) => createAction(SEARCH_ACTION_TYPES.SET_SEARCH, search)
export const setSearchMap = (searchMap) => createAction(SEARCH_ACTION_TYPES.SET_SEARCH_MAP, searchMap)
export const setOrientation = (orientation) => createAction(SEARCH_ACTION_TYPES.SET_ORIENTATION, orientation)
export const setPage = (page) => createAction(SEARCH_ACTION_TYPES.SET_PAGE, page)
export const setMorePage = (morePage) => createAction(SEARCH_ACTION_TYPES.SET_MORE_PAGE, morePage)
export const setPerPage = (perPage) => createAction(SEARCH_ACTION_TYPES.SET_PER_PAGE, perPage)
export const setIsLoading = (isLoading) => createAction(SEARCH_ACTION_TYPES.SET_IS_LOADING, isLoading)
export const setView = (view) => createAction(SEARCH_ACTION_TYPES.SET_VIEW, view)
export const setClassChange = (classChange) => createAction(SEARCH_ACTION_TYPES.SET_CLASS_CHANGE, classChange)