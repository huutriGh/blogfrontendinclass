import { BLOG_ACTION_TYPES } from "./blog.types";

export const BLOG_INITIAL_STATE = {
  isFetching: false,
  blogs: [],
};

export const blogReducer = (state = BLOG_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case BLOG_ACTION_TYPES.FETCH_BLOG_START:
      return {
        ...state,
        isFetching: true,
      };
    case BLOG_ACTION_TYPES.FETCH_BLOG_SUCCESS:
      return {
        ...state,
        blogs: payload,
        isFetching: false,
      };
    case BLOG_ACTION_TYPES.DELTE_BLOG_SUCCESS:
      return {
        ...state,
        blogs: {
          ...state.blogs,
          data: state.blogs.data.filter((item) => item.blogId !== payload),
        },
      };

    default:
      return state;
  }
};
