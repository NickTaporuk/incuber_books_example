import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List'
import { NavLink, Redirect } from 'react-router-dom'
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import TableIcon from 'material-ui/svg-icons/navigation/apps';
import { SIDEBAR_ACTUAL_STATE } from './../../constants/reducers/sidebar'

class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { sidebar, onRequestChangeByDocument } = this.props;
        return (
            <Paper>
                <Drawer open={ sidebar.visible } docked={ false } onRequestChange={() => onRequestChangeByDocument(!sidebar.visible)}>
                    <List>
                        <NavLink  exact to="/" onClick={() => { onRequestChangeByDocument(false)}}>
                            <ListItem>Home</ListItem>
                        </NavLink>
                    </List>
                </Drawer>
            </Paper>
        );
    }
}


function mapStateToProps(state) {
    const { sidebar } = state;

    console.log('%s sidebar: ', this.displayName);
    return {
        sidebar
    }
}

export default connect(
    mapStateToProps,
    dispatch => ({
        onRequestChangeByDocument : (RightIconMenuEventClick) => {
            const payload = {
                sidebar : {
                    visible : RightIconMenuEventClick
                }
            };

            dispatch({ type: SIDEBAR_ACTUAL_STATE , payload})
        }
    })
)(withRouter(Sidebar));
