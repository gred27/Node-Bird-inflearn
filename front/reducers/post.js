// 초기 state
export const initialState = {
    mainPost: [],
};

// action의 이름
export const ADD_POST = "ADD_POST";
export const ADD_DUMMY = "ADD_DUMMY";

// action state
const addPost = {
    type: ADD_POST,
};

const addDummy = {
    type: ADD_DUMMY,
    data: {
        content: "Hello",
        UserId: 1,
        User: {
            nickname: "gred",
        },
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case addPost: {
            return {
                ...state,
            };
        }
        case addDummy: {
            return {
                ...state,
                mainPost: [action.data, ...state.mainPost],
            };
        }
        default:
            return;
    }
};

export default reducer;
