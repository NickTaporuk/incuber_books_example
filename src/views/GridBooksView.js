import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import {capitalizeFirstLetterEachSentence, slugFormatting} from './../helpers/stringFormatting';
import {timestampToDate} from './../helpers/dateFormatting';
import {booksTitleFilter} from './../helpers/filters';
import Spinner from './../components/spinner/Spinner';
import NotFoundBooks from './../components/notFoundBooks/NotFoundBooks';
import { imgBooksPathRoot }  from './../constants/images/images';
import { CONTENT_VIEW_LIST } from './../constants/reducers/contentView'

class GridBooksView extends Component {

    getGridList(books, history, contentView) {
        return (
            <main className="catalogue">
                <div className="catalogue__inner">
                    <Subheader>
                        { books.length > 0 ? `1-${books.length} of ${books.length} results for Books` : null }
                    </Subheader>
                    <section className={ `catalogue__content-book ${contentView == CONTENT_VIEW_LIST ? 'catalogue__content-book_list' : ''}` }>
                        <ul className="catalogue__content-wrap flex flex-wrap flex-justify-flex-start">
                            {
                                books.map((tile, index) => {
                                    const bookSrc = tile.img;
                                    return (
                                        <li
                                        key={ index }
                                        onClick={ () => {
                                                history.push(`/books/${tile.category}/${slugFormatting(tile.title)}`)
                                            }
                                        }
                                        className="catalogue__content-item">
                                        <a className="catalogue__content-link">
                                        <span className="catalogue__content-img-cover">
                                            <img className="catalogue__content-img" src={ `/${process.env.PUBLIC_URL}${imgBooksPathRoot}${bookSrc}` } alt={ capitalizeFirstLetterEachSentence(tile.title) }/>
                                            <span className="catalogue__content-overlay"></span>
                                        </span>
                                            <span className="catalogue__content-card">
                                            <span className="catalogue__content-title">{ capitalizeFirstLetterEachSentence(tile.title) }</span>
                                            <span className="catalogue__content-subtitle">{ tile.author }</span>
                                            <span className="catalogue__content-data">{ timestampToDate(tile.timestamp) }</span>
                                            <span className="catalogue__content-icon-edit">
                                                <FloatingActionButton mini={true} secondary={true} >
                                                    <ContentCreate onClick={
                                                        (e) => {
                                                            e.stopPropagation();
                                                            history.push(`/books/${tile.category}/${slugFormatting(tile.title)}/edit/${tile.id}`)
                                                        }}/>
                                                </FloatingActionButton>
                                            </span>
                                        </span>
                                        </a>
                                    </li>)
                                    }
                                )
                            }
                        </ul>
                    </section>
                </div>
            </main>
        )
    }

    defaultDisplayContent(loaded) {
        const defaultDisplayContent = loaded ? <NotFoundBooks/> : <Spinner size={80} thickness={5}/>;

        return defaultDisplayContent;
    }

    render() {
        let { history, books, loaded, contentView } = this.props;
        if(this.props.hasOwnProperty('booksPreview') && !!this.props.booksPreview) books = this.props.booksPreview;
        return books.length > 0 ? this.getGridList(books, history, contentView) : this.defaultDisplayContent(loaded);
    }
}

const mapStateToProps = state => {
    return {
        books: booksTitleFilter(state.data.books, state.search.searchFilterCharacters),
        loaded: state.data.loaded,
        contentView : state.contentView
    }
};

export default connect(
    mapStateToProps
)(withRouter(GridBooksView));