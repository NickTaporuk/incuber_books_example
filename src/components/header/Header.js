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

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchOpened : false,
            contentStructure : 'List'
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
                                ref={ (searchInput) => { this.searchInput = searchInput}}
                                id='search'
                                onBlur={() => { this.setState({searchOpened : false});console.log('onBlur this.searchInput:', this.searchInput.refs)}}
                                onChange={() => console.log('onChange')}
                                onRequestSearch={() => console.log('onRequestSearch')} />
                        :
                            <IconButton
                                touch
                                iconStyle={{color : "#ffffff"}}
                                onClick={this.onFocus}>
                                <SearchIcon />
                            </IconButton>
                }
                {
                    this.state.contentStructure === 'List'
                        ?
                            <IconButton
                                touch
                                iconStyle={{color : "#ffffff"}}
                                onClick={() => { this.setState({contentStructure : 'Table'});}}>
                                <ListIcon />
                            </IconButton>
                        :
                            <IconButton
                                touch
                                iconStyle={{color : "#ffffff"}}
                                onClick={() => { this.setState({contentStructure : 'List'});}}>
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
    const { sidebar } = state;
    return {
        sidebar
    }
}

export default connect(
    mapStateToProps,
    dispatch => ({
        onClickHeaderRightIconMenu : (RightIconMenuEventClick) => {
            const payload = {
                sidebar : {
                    visible : RightIconMenuEventClick
                }
            };

            dispatch({ type: SIDEBAR_ACTUAL_STATE , payload})
        }
    })
)(withRouter(Header));

