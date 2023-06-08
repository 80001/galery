import { combineReducers } from "redux";
import { UserReducer } from "./user/user.reducer";
import { BlogReducer } from "./blog/blog.reducer";
import { SearchReducer } from "./search/search.reducer";
import { GalleryReducer } from "./gallery/gallery.reducer";
import { ModalReducer } from "./modals/modals.reducer";

export const rootReducer = combineReducers({
    user: UserReducer,
    blog: BlogReducer,
    search: SearchReducer,
    gallery: GalleryReducer,
    modal: ModalReducer,
})