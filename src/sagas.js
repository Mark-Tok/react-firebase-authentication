import {
  call,
  put,
  takeLatest,
  select
} from "redux-saga/effects";

import {
  REQUEST_API_DATA,
  receiveApiData
} from "../src/store/fetch/actions";
import {
  username
} from './selector'

function* getApiData(action) {
  try {
    const url = yield select(username)
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (e) {
        console.log(e);
      }
    };

    const data = yield call(fetchData);
    yield put(receiveApiData(data));

  } catch (e) {
    console.log(e);
  }
}

export default function* mySaga() {
  yield takeLatest(REQUEST_API_DATA, getApiData);
}