import {
    SET_BOOKS_DATA_IN_PROGRESS,
    SET_BOOKS_DATA_SUCCESS,
    SET_BOOKS_DATA_FAILED,
    CHANGE_BOOK_ITEM,
    DELETE_BOOK_ITEM
} from './../constants/reducers/data'

const initialState = {
    books : [],
    loaded : false
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SET_BOOKS_DATA_IN_PROGRESS :
            return {
                ...state,...action.payload
            };

        case SET_BOOKS_DATA_SUCCESS :
            return {
                ...state,...action.payload
            };

        case SET_BOOKS_DATA_FAILED :
            return {
                ...state,...action.payload
            };
        case CHANGE_BOOK_ITEM : {
            return {
                ...state,...action.payload
            };
        }
        case DELETE_BOOK_ITEM : {

            return {
                books : action.payload.books,
                loaded : state.loaded
            };
        }

        default: return state;
    }
}