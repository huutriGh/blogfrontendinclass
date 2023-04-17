import { BLOG_ACTION_TYPES } from "./blog.types";

export const fetchBlogStart = (pageNo, pageSize) => ({
  type: BLOG_ACTION_TYPES.FETCH_BLOG_START,
  payload: { pageNo, pageSize },
});

export const fetchBlogSuccess = (blogs) => ({
  type: BLOG_ACTION_TYPES.FETCH_BLOG_SUCCESS,
  payload: blogs,
});

export const fetchBlogFailed = (error) => ({
  type: BLOG_ACTION_TYPES.FETCH_BLOG_FAILED,
  payload: error,
});

export const deleteBlogStart = (blog) => ({
  type: BLOG_ACTION_TYPES.DELETE_BLOG_START,
  payload: blog,
});

export const deleteBlogSuccess = (blog) => ({
  type: BLOG_ACTION_TYPES.DELETE_BLOG_SUCCESS,
  payload: blog,
});

export const deleteBlogFailed = (error) => ({
  type: BLOG_ACTION_TYPES.DELETE_BLOG_FAILED,
  payload: error,
});
