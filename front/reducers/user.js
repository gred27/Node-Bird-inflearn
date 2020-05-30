const dummyUser = {
    nickname: "gred",
    Post: [],
    Fllowings: [],
    Fllwers: [],
    SignUpData: false,
};

// 초기 state
export const initialState = {
    isLoggedIn: false,
    user: null,
    imagePaths: [],
};

// action의 이름
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SIGN_UP = "SIGN_UP";

// action state
export const loginAction = {
    type: LOG_IN,
    data: {
        nickname: "gred",
    },
};

export const logoutAction = {
    type: LOG_OUT,
};

// 동적데이터는 함수를 만들어서 사용
export const signUpAction = (data) => {
    return {
        type: SIGN_UP,
        data: data,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: dummyUser,
            };
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: {},
            };
        }

        case SIGN_UP: {
            return { ...state, SignUpData: action.data };
        }
        default:
            return {
                ...state,
            };
    }
};

export default reducer;
