import { SEARCH_ACTION_TYPES } from "./search.types"

const INITIAL_STATE = {
    search: 'star wars',
    history: [],
    showComments: true,
    writeComments: false,
    orientation: 'landscape',
    page: 1,
    morePage: 1,
    perPage: 10,
    isLoading: false,
    view: 'big',
    classChange: '',
    searchBoolean: false,
}

export const SearchReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case SEARCH_ACTION_TYPES.SET_SEARCH:
            return {
                ...state,
                search: payload
            }
        case SEARCH_ACTION_TYPES.SET_HISTORY:
            return {
                ...state,
                history: payload
            }
        case SEARCH_ACTION_TYPES.SET_SHOW_COMMENTS:
            return {
                ...state,
                showComments: payload
            }
        case SEARCH_ACTION_TYPES.SET_WRITE_COMMENTS:
            return {
                ...state,
                writeComments: payload
            }
        case SEARCH_ACTION_TYPES.SET_ORIENTATION:
            return {
                ...state,
                orientation: payload
            }
        case SEARCH_ACTION_TYPES.SET_PAGE:
            return {
                ...state,
                page: payload
            }
        case SEARCH_ACTION_TYPES.SET_MORE_PAGE:
            return {
                ...state,
                morePage: payload
            }
        case SEARCH_ACTION_TYPES.SET_PER_PAGE:
            return {
                ...state,
                perPage: payload
            }
        case SEARCH_ACTION_TYPES.SET_IS_LOADING:
            return {
                ...state,
                isLoading: payload
            }
        case SEARCH_ACTION_TYPES.SET_VIEW:
            return {
                ...state,
                view: payload
            }
        case SEARCH_ACTION_TYPES.SET_CLASS_CHANGE:
            return {
                ...state,
                classChange: payload
            }
        case SEARCH_ACTION_TYPES.SET_SEARCH_BOOLEAN:
            return {
                ...state,
                searchBoolean: payload
            }
        default:
            return state
    }
}