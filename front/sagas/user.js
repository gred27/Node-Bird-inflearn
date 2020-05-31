import { all, fork, takeLates, takeEvery, call, put, take, delay } from "redux-saga/effects";
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_FAILURE,
    SIGN_UP_SUCCESS,
} from "../reducers/user";

function signUpAPI() {
    return;
}

function* signUp() {
    try {
        yield call(signUpAPI);
        yield put({
            // put은 dispatch와 동일
            type: SIGN_UP_SUCCESS,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
        });
    }
}

function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function loginAPI() {
    return;
}

function* login() {
    try {
        yield call(loginAPI);
        yield delay(2000);
        yieldput({
            type: LOG_IN_SUCCESS,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
        });
    }
}

function* watchLogin() {
    yield takeEvery(LOG_IN_REQUEST);
}

export default function* userSaga() {
    yield all([fork(watchLogin), fork(watchSignUp)]);
}
