import { all, call } from "redux-saga/effects";
import { blogsSaga } from "./blog/blog.saga";

export function* rootSaga() {
  yield all([call(blogsSaga)]);
}
