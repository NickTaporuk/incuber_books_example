import { SEARCH_FILTER_BY_CHARACTERS } from './../constants/reducers/search'

const initialState = {
    searchFilterCharacters : '',
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SEARCH_FILTER_BY_CHARACTERS :
            return {
                ...state,...action.payload
            };

        default: return state;
    }
}