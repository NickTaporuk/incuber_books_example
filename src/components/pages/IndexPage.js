import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import GridBooksView from './../../views/GridBooksView'
import { SET_BOOKS_DATA_IN_PROGRESS, SET_BOOKS_DATA_SUCCESS } from './../../constants/reducers/data'
import dummyBooksJson from './../../dummyData/books.json';
import { makeRequest } from './../../helpers/dummyRequest';

class IndexPage extends Component {

    render() {

        const self = this;

        if(this.props.books.length === 0) 
            makeRequest(self.props.onSetBooksDataLoaded, dummyBooksJson.books, 2000)
                .then((resolve) => {
                    self.props.onSetBooksData(resolve);
                    self.props.onSetBooksDataLoaded(true);
                }).catch(e => {
                    self.props.onSetBooksDataLoaded(false);
                });

        return (
            <div className="content-wrapper">
                <GridBooksView/>
            </div>
        )
    }
}

const mapStateToProps = state => {

    return {
            books : state.data.books
        }
};

const mapDispatchToProps = dispatch => ({
    onSetBooksData(books) {
        const payload = {
            books
        };

        dispatch({ type: SET_BOOKS_DATA_SUCCESS , payload})
    },

    onSetBooksDataLoaded(loaded) {
        const payload = {
            loaded
        };

        dispatch({ type: SET_BOOKS_DATA_IN_PROGRESS , payload})
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(IndexPage));
