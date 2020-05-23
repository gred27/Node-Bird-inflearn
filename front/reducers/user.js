// 초기 state
export const initialState = {
    isLoggedIn: false,
    user: {},
};

// action의 이름
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

// action state
const loginAction = {
    type: LOG_IN,
    data: {
        nickname: "gred",
    },
};

const logoutAction = {
    type: LOG_OUT,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case loginAction: {
            return {
                ...state,
                isLoggedIn: true,
                user: action.data,
            };
        }
        case logoutAction: {
            return {
                ...state,
                isLoggedIn: false,
                user: {},
            };
        }
        default:
            return;
    }
};

export default reducer;
