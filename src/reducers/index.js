import { combineReducers } from 'redux';

import search from './search';
import sidebar from './sidebar';

export default combineReducers({
    search,
    sidebar
});