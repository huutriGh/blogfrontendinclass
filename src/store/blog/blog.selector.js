import { createSelector } from "reselect";

const selectBlogReducer = (state) => state.blogs;

export const selectBlogs = createSelector(
  [selectBlogReducer],
  (blogSlice) => blogSlice.blogs
);

export const selectBlogIsFectching = createSelector(
  [selectBlogReducer],
  (blogSlice) => blogSlice.isFetching
);
