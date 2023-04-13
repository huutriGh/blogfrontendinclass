import { all, call, delay, put, takeLatest } from "redux-saga/effects";

import {
  deleteBlogFailed,
  deleteBlogSucess,
  fetchBlogStart,
  fetchBlogSucess,
} from "./blog.action";

import client from "../../api/client";
import { BLOG_ACTION_TYPES } from "./blog.types";

const getBlogs = async ({ pageNo, pageSize = 10 }) => {
  const resp = await client.get(`/blogs?pageNo=${pageNo}&pageSize=${pageSize}`);

  return resp;
};
const deleteBlog = async (blog) => {
  const resp = await client.delete("/blogs/delete", { data: blog });
  return resp;
};

export function* fetchBlogAsync({ payload }) {
  try {
    yield delay(10000);
    const resp = yield call(getBlogs, payload);
    const {
      empty,
      first,
      last,
      numberOfElements,
      totalElements,
      totalPages,
      content,
      number,
    } = resp.data;
    yield put(
      fetchBlogSucess({
        empty,
        first,
        last,
        numberOfElements,
        totalElements,
        totalPages,
        data: content,
        number,
      })
    );
  } catch (error) {
    yield put(fetchBlogStart(error));
  }
}
export function* deleteBlogAsync({ payload }) {
  try {
    console.log(payload);
    yield call(deleteBlog, payload);
    yield put(deleteBlogSucess(payload.blogId));
  } catch (error) {
    yield put(deleteBlogFailed(error));
  }
}

export function* onFetchBlogs() {
  yield takeLatest(BLOG_ACTION_TYPES.FETCH_BLOG_START, fetchBlogAsync);
}
export function* onDeleteBlogs() {
  yield takeLatest(BLOG_ACTION_TYPES.DELTE_BLOG_START, deleteBlogAsync);
}

export function* blogsSaga() {
  yield all([call(onFetchBlogs), call(onDeleteBlogs)]);
}
