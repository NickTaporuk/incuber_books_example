import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import {capitalizeFirstLetterEachSentence, slugFormatting} from './../helpers/stringFormatting';
import {timestampToDate} from './../helpers/dateFormatting';
import {booksTitleFilter} from './../helpers/filters';
import Spinner from './../components/spinner/Spinner';
import NotFoundBooks from './../components/notFoundBooks/NotFoundBooks';
import  { imgBooksPathRoot }  from './../constants/images/images';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 1200,
        height: 450,
    },
    GridTile: {
        cursor: 'pointer'
    }
};

class GridListView extends Component {

    getGridList(books, styles, history) {
        return <div style={styles.root}>
            <GridList
                cellHeight={350}
                style={styles.gridList}
                cols={3}
            >
                <Subheader>
                    { books.length > 0 ? `1-${books.length} of ${books.length} results for Books` : null }
                </Subheader>
                {
                    books.map((tile, index) => {
                            const bookSrc = tile.img;

                            return (
                                < GridTile
                                    onClick={ () => {
                                        history.push(`books/${tile.category}/${slugFormatting(tile.title)}`)
                                    } }
                                    style={styles.GridTile}
                                    key={index}
                                    title={ capitalizeFirstLetterEachSentence(tile.title) }
                                    subtitle={
                                        <span>by <b>{tile.author}</b><br/><span>{ timestampToDate(tile.timestamp) }</span></span>}
                                    actionIcon={
                                        <FloatingActionButton mini={true} secondary={true}>
                                            <ContentCreate onClick={
                                                (e) => {
                                                    e.stopPropagation();
                                                    history.push(`books/${tile.category}/${slugFormatting(tile.title)}/edit/${tile.id}`)
                                                }}/>
                                        </FloatingActionButton>
                                    }
                                >
                                    <img key={index} src={ `/${process.env.PUBLIC_URL}${imgBooksPathRoot}${bookSrc}` }/>
                                </GridTile>
                            )
                        }
                    )
                }
            </GridList>
        </div>
    }

    defaultDisplayContent(loaded) {
        const defaultDisplayContent = loaded ? <NotFoundBooks/> : <Spinner size={80} thickness={5}/>;

        return defaultDisplayContent;
    }

    render() {
        const {history, books, loaded} = this.props;

        return books.length > 0 ? this.getGridList(books, styles, history) : this.defaultDisplayContent(loaded);
    }
}

const mapStateToProps = state => {
    return {
        books: booksTitleFilter(state.data.books, state.search.searchFilterCharacters),
        loaded: state.data.loaded
    }
};

export default connect(
    mapStateToProps
)(withRouter(GridListView));