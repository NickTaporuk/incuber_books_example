import { CONTENT_VIEW_STATE, CONTENT_VIEW_TABLE } from './../constants/reducers/contentView'

const initialState = CONTENT_VIEW_TABLE ;

export default function (state = initialState, action) {
    switch (action.type) {

        case CONTENT_VIEW_STATE :
            return action.payload.contentView;

        default: return state;
    }
}