import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import GridBooksView from './../../views/GridBooksView';
import { slugFormatting } from './../../helpers/stringFormatting'
class BookPage extends Component {

    render() {
        const { books, match } = this.props;
        const book = books.filter(item => match.params.slug === slugFormatting(item.title));
        console.log('BookPage:',book);
        return (
            <div className="content-wrapper">
                <GridBooksView booksPreview={book}/>
            </div>
        )
    }
}

const mapStateToProps = state => {

    return {
        books: state.data.books
    }
};

export default connect(
    mapStateToProps,
    null
)(withRouter(BookPage));