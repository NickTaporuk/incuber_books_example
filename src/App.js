import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {orange500, deepOrange500} from 'material-ui/styles/colors'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List'
import SearchBar from 'material-ui-search-bar';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import SearchIcon from 'material-ui/svg-icons/action/search';
import ListIcon from 'material-ui/svg-icons/content/sort';
import TableIcon from 'material-ui/svg-icons/navigation/apps';

injectTapEventPlugin();
const muiTheme = getMuiTheme({
    palette: {
        primary1Color : deepOrange500,
        accent1Color  : orange500
    }
});


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpened : false,
            searchOpened : false,
            contentStructure : 'List'
        }
    }

    _toogleDrawer() {
        this.setState({
            drawerOpened : !this.state.drawerOpened
        });
    }
    onFocus() {
        this.setState({searchOpened: true});
        console.log('this.searchInput:',this.refs.searchInput);
        // this.refs.searchInput.focus();
    }
    render() {
        const search = <SearchBar ref="searchInput" id='search' onBlur={() => { this.setState({searchOpened : false});console.log('onBlur')}} onChange={() => console.log('onChange')} onRequestSearch={() => console.log('onRequestSearch')} />;

        const rightButtons = (
            <div style={{display: "inline-flex" }}>
                {
                    this.state.contentStructure === 'List' ?
                        <IconButton touch iconStyle={{color : "#ffffff"}} onClick={() => { this.setState({contentStructure : 'Table'});}}>
                            <ListIcon />
                        </IconButton>
                    :
                        <IconButton touch iconStyle={{color : "#ffffff"}} onClick={() => { this.setState({contentStructure : 'List'});}}>
                            <TableIcon />
                        </IconButton>
                }
                {
                    this.state.searchOpened ?
                        <SearchBar ref="searchInput" id='search' onBlur={() => { this.setState({searchOpened : false});console.log('onBlur')}} onChange={() => console.log('onChange')} onRequestSearch={() => console.log('onRequestSearch')} /> : <IconButton touch iconStyle={{color : "#ffffff"}} onClick={this.onFocus.bind(this)}><SearchIcon /></IconButton> }
            </div>
        );
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Paper>
                    <AppBar title="Books Shop" iconElementRight={rightButtons} onLeftIconButtonTouchTap={() => this._toogleDrawer()}/>
                    <Drawer open={ this.state.drawerOpened } docked={ false } onRequestChange={() => this._toogleDrawer()}>
                        <List>
                            <ListItem>Item 1</ListItem>
                            <ListItem>Item 2</ListItem>
                            <ListItem>Item 3</ListItem>
                        </List>
                    </Drawer>
                </Paper>
            </MuiThemeProvider>
        );
    }
}

export default App;
