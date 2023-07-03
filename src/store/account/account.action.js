import { createAction } from "../../utils/reducer.utils";
import { ACCOUNT_ACTION_TYPES } from "./account.types";

export const showPosts = (name, params) =>
    createAction(ACCOUNT_ACTION_TYPES.SHOW_POSTS, { name, params })
export const showComments = (name, params) =>
    createAction(ACCOUNT_ACTION_TYPES.SHOW_COMMENTS, { name, params })