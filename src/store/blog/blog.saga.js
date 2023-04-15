import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import client from "../../api/client";

import { BLOG_ACTION_TYPES } from "./blog.types";

import { fetchBlogSuccess, fetchBlogFailed } from "./blog.action";

const getBlogs = async ({ pageNo, pageSize = 10 }) => {
  const resp = await client.get(`/blogs?pageNo=${pageNo}&pageSize=${pageSize}`);
  return resp;
};

function* fetchBlogAsync({ payload }) {
  try {
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
      fetchBlogSuccess({
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
    yield put(fetchBlogFailed(error));
  }
}

export function* onFecthBlogs() {
  yield takeLatest(BLOG_ACTION_TYPES.FETCH_BLOG_START, fetchBlogAsync);
}

export function* blogsSaga(){
    yield all([call(onFecthBlogs)])
}
