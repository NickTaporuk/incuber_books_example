import { combineReducers } from 'redux';

import search from './search';
import sidebar from './sidebar';
import data from './data';
import contentView from './contentView';

export default combineReducers({
    search,
    sidebar,
    data,
    contentView
});