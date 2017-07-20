import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { SIDEBAR_ACTUAL_STATE } from './../../constants/reducers/sidebar'
import { SEARCH_FILTER_BY_CHARACTERS } from './../../constants/reducers/search'
import ListIcon from 'material-ui/svg-icons/content/sort';
import TableIcon from 'material-ui/svg-icons/navigation/apps';
import { CONTENT_VIEW_STATE, CONTENT_VIEW_TABLE, CONTENT_VIEW_LIST } from './../../constants/reducers/contentView'

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleTouchTap = this.handleTouchTap.bind(this);
    }

    handleTouchTap() {
        const { history } = this.props;
        history.push('/');
    }
    render() {
        const rightButtons = (
            <div style={{display: "flex" }}>

                {
                    this.props.contentView == CONTENT_VIEW_LIST
                        ?
                        <IconButton
                            touch
                            iconStyle={{color : "#ffffff"}}
                            onClick={ () => { this.props.onChangeContentView(CONTENT_VIEW_TABLE); }}>
                            <ListIcon />
                        </IconButton>
                        :
                        <IconButton
                            touch
                            iconStyle={{color : "#ffffff"}}
                            onClick={() => { this.props.onChangeContentView( CONTENT_VIEW_LIST );}}>
                            <TableIcon />
                        </IconButton>
                }
            </div>
        );
        const leftButtons = (
            <IconButton
                    touch
                    iconStyle={{color : "#ffffff"}}
                    onClick={this.handleTouchTap}>
                    <ArrowBackIcon />
            </IconButton>
            );

        return (
            <Paper>
                <AppBar
                    title="Books Shop"
                    iconElementLeft={leftButtons}
                    iconElementRight={rightButtons}
                    onLeftIconButtonTouchTap={this.handleTouchTap}
                    onTitleTouchTap={this.handleTouchTap}
                />
            </Paper>
        );
    }
}

function mapStateToProps(state) {
    const { sidebar, contentView } = state;
    return {
        sidebar,
        contentView
    }
}

export default withRouter(connect(
    mapStateToProps,
    dispatch => ({
        onClickHeaderRightIconMenu (RightIconMenuEventClick) {
            const payload = {
                sidebar : {
                    visible : RightIconMenuEventClick
                }
            };

            dispatch({ type: SIDEBAR_ACTUAL_STATE , payload})
        },

        onSearchFilterChange(searchFilterCharacters) {
            const payload = {
                searchFilterCharacters
            };

            dispatch({ type: SEARCH_FILTER_BY_CHARACTERS , payload})
        },

        onChangeContentView(contentView) {
            const payload = {
                contentView
            };

            dispatch({ type: CONTENT_VIEW_STATE , payload})
        }
    })
)(Header));

