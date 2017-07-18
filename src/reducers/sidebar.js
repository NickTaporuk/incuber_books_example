import { SIDEBAR_ACTUAL_STATE } from './../constants/reducers/sidebar'

const initialState = {
    sidebar : {
        visible : false
    }
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SIDEBAR_ACTUAL_STATE :
            return {
                ...state,...action.payload.sidebar
            };
            break;

        default: return state;
    }
}