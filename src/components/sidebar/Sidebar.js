import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import HomeIcon from 'material-ui/svg-icons/action/home';
import { SIDEBAR_ACTUAL_STATE } from './../../constants/reducers/sidebar'
import MenuItem from 'material-ui/MenuItem';

class Sidebar extends Component {

    render() {
        const { history, sidebar, onRequestChangeByDocument } = this.props;
        return (
            <Paper>
                <Drawer  open={ sidebar.visible } docked={ false } onRequestChange={() => onRequestChangeByDocument(!sidebar.visible)}>
                        <MenuItem onClick={() => { onRequestChangeByDocument(false); history.push("/")}} primaryText="Home" leftIcon={<HomeIcon/>} />
                </Drawer>
            </Paper>
        );
    }
}

function mapStateToProps(state) {
    const { sidebar } = state;

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
