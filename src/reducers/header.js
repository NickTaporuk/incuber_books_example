import { SEARCH_FILTER_BY_CHARACTERS } from './../constants/search'

const initialState = {
    filterCharacters : ''
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SEARCH_FILTER_BY_CHARACTERS :
            return {
                ...state,filterCharacters: action.payload.filterCharacters
            };
            break;

        default: return state;
    }
}