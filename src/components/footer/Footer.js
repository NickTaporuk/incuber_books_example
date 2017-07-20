import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import AppBar from 'material-ui/AppBar';
import SearchBar from 'material-ui-search-bar';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import SearchIcon from 'material-ui/svg-icons/action/search';
import ListIcon from 'material-ui/svg-icons/content/sort';
import TableIcon from 'material-ui/svg-icons/navigation/apps';
import { SIDEBAR_ACTUAL_STATE } from './../../constants/reducers/sidebar'

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Paper>
                <AppBar id="footer" style={{ flex: '0 0 auto'}} />
            </Paper>
        );
    }
}

export default Footer;

