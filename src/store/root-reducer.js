import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { BlogReducer } from "./blog/blog.reducer";
import { searchReducer } from "./search/search.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    blog: BlogReducer,
    search: searchReducer
})