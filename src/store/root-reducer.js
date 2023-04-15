import { combineReducers } from "redux";

import { blogReducer } from "./blog/blog.reducer";

export const rootReducer = combineReducers({
  blogs: blogReducer,
});
