import { BLOG_ACTION_TYPES } from "./blog.types";

export const fetchBlogStart = (pageNo, pageSize) => ({
  type: BLOG_ACTION_TYPES.FETCH_BLOG_START,
  payload: { pageNo, pageSize },
});
export const fetchBlogSucess = (blogs) => ({
  type: BLOG_ACTION_TYPES.FETCH_BLOG_SUCCESS,
  payload: blogs,
});
export const fetchBlogFailed = (error) => ({
  type: BLOG_ACTION_TYPES.FETCH_BLOG_FAILED,
  payload: error,
});
export const deleteBlogStart = (blog) => ({
  type: BLOG_ACTION_TYPES.DELTE_BLOG_START,
  payload: blog,
});
export const deleteBlogSucess = (blogId) => ({
  type: BLOG_ACTION_TYPES.DELTE_BLOG_SUCCESS,
  payload: blogId,
});
export const deleteBlogFailed = (error) => ({
  type: BLOG_ACTION_TYPES.DELTE_BLOG_FAILED,
  payload: error,
});
