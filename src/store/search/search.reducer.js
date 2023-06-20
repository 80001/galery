import { SEARCH_ACTION_TYPES } from "./search.types"

const INITIAL_STATE = {
    //пошук за запитом
    search: 'star wars',
    //масив для модалки
    searchMap: [],
    //альбом, портрет, квадрат
    orientation: 'landscape',
    //page for images
    page: 1,
    //додаткові сторінки при додавані фт на сторінку
    morePage: 1,
    //фт на сторінці
    perPage: 10,
    //
    isLoading: false,
    //перемикач вигляду зображень: великі чи малі
    view: 'big',
    //клас для зміни вигляду
    classChange: '',
}

export const SearchReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case SEARCH_ACTION_TYPES.SET_SEARCH:
            return {
                ...state,
                search: payload
            }
        case SEARCH_ACTION_TYPES.SET_SEARCH_MAP:
            return {
                ...state,
                searchMap: payload
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
        default:
            return state
    }
}