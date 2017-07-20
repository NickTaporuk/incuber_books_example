import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import AppBar from 'material-ui/AppBar';
import SearchBar from './../searchbar/SearchBar';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import SearchIcon from 'material-ui/svg-icons/action/search';
import ListIcon from 'material-ui/svg-icons/content/sort';
import TableIcon from 'material-ui/svg-icons/navigation/apps';
import { SIDEBAR_ACTUAL_STATE } from './../../constants/reducers/sidebar'
import { SEARCH_FILTER_BY_CHARACTERS } from './../../constants/reducers/search'
import { CONTENT_VIEW_STATE, CONTENT_VIEW_TABLE, CONTENT_VIEW_LIST } from './../../constants/reducers/contentView'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchOpened : false
        };

        this.onFocus = this.onFocus.bind(this);
        this.onHideSearchInput = this.onHideSearchInput.bind(this);
    }

    _toogleDrawer() {
        const {onClickHeaderRightIconMenu, sidebar} = this.props;

        onClickHeaderRightIconMenu(!sidebar.visible);
    }

    onHideSearchInput(e) {
        if(e.target.id !== 'search') {
            document.body.removeEventListener('click', this.onHideSearchInput);
            this.setState({searchOpened: false});

        }
    }

    onFocus() {
        this.setState({searchOpened: true});
        document.body.addEventListener('click', this.onHideSearchInput);
    }

    render() {

        const rightButtons = (
            <div style={{display: "flex" }}>
                {
                    this.state.searchOpened
                        ?
                            <SearchBar
                                id='search'
                                onBlur={() => { this.setState({searchOpened : false})}}
                                onChange={() => {}}
                                onRequestSearch={() => {}}
                            />
                        :
                            <IconButton
                                touch
                                iconStyle={{color : "#ffffff"}}
                                onClick={this.onFocus}>
                                <SearchIcon />
                            </IconButton>
                }
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

        return (
                <Paper>
                    <AppBar
                        title="Books Shop"
                        iconElementRight={rightButtons}
                        onLeftIconButtonTouchTap={() => this._toogleDrawer()}
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

export default connect(
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
)(withRouter(Header));

