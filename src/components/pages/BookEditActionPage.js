import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import TextField from 'material-ui/TextField';
import NotFoundBooks from './../notFoundBooks/NotFoundBooks';
import DatePicker from 'material-ui/DatePicker';
import {capitalizeFirstLetterEachSentence} from './../../helpers/stringFormatting';
import RaisedButton from 'material-ui/RaisedButton';
import {CHANGE_BOOK_ITEM, DELETE_BOOK_ITEM} from './../../constants/reducers/data';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import GridBooksView from './../../views/GridBooksView';
import { red500 } from 'material-ui/styles/colors'

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    gridList: {
        height: 450,
    },
    GridTile: {
        cursor: 'pointer'
    },
    button: {
        marginTop: 20
    },
    buttonColor : {
        backgroundColor: red500
    }
};

class BookEditActionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };

        this.onChangeTextField = this.onChangeTextField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit = () => {
        const {books, match, history} = this.props;

        this.setState({open: false});
        const book = this.props.books.filter((item) => item.id === parseInt(match.params.id))[0];
        this.onDeleteBookItem(books, book, history);
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={ true }
                onTouchTap={ this.handleClose }
            />,
            <FlatButton
                label="Submit"
                primary={ true }
                keyboardFocused={ true }
                onTouchTap={ this.handleSubmit }
            />,
        ];
        const editBook = !!this.props.books ? this.props.books.filter((item) => item.id === parseInt(this.props.match.params.id))[0] : {};
        return editBook !== undefined && Object.keys(editBook).length > 0 ?
            <div className="content-wrapper book-edit-action">
                <div className="preview-book">
                    <div style={styles.root}>
                        <div className="preview-title">Preview :</div>
                        <GridBooksView booksPreview={ [editBook] }/>
                        <div className="edit-box">
                            <div className="edit-title">Edit :</div>
                            <form>
                                <TextField
                                    id="text-field-default"
                                    floatingLabelText="Author"
                                    floatingLabelFixed={true}
                                    defaultValue={ editBook.author }
                                    onChange={
                                        (e) => {
                                            this.onChangeTextField(this.props.books, {
                                                ...editBook,
                                                author: capitalizeFirstLetterEachSentence(e.target.value)
                                            });
                                        }
                                    }
                                /><br/>
                                <TextField
                                    id="text-field-default"
                                    floatingLabelText="Title"
                                    floatingLabelFixed={true}
                                    defaultValue={ editBook.title }
                                    onChange={
                                        (e) => {
                                            this.onChangeTextField(this.props.books, {
                                                ...editBook,
                                                title: capitalizeFirstLetterEachSentence(e.target.value)
                                            });
                                        }
                                    }
                                /><br/>
                                <DatePicker
                                    floatingLabelText="Date"
                                    hintText="Date"
                                    defaultDate={ new Date(editBook.timestamp * 1000)}
                                    onChange={
                                        (e, date) => {
                                            this.onChangeTextField(this.props.books, {
                                                ...editBook,
                                                timestamp: date * 1 / 1000
                                            });
                                        }
                                    }
                                />

                            </form>
                            <div className="edit-title" style = {styles.button} >Delete :</div>
                            <Dialog
                                title="Delete this book ?"
                                actions={actions}
                                modal={false}
                                open={this.state.open}
                                onRequestClose={this.handleClose}
                            >
                                Are you sure ?
                            </Dialog>
                            <RaisedButton
                                label="Delete"
                                secondary={true}
                                style = {styles.button}
                                buttonStyle = {styles.buttonColor}
                                onTouchTap={this.handleOpen}
                            />
                        </div>
                    </div>
                </div>
            </div>
            : <NotFoundBooks/>
    }

    onChangeTextField(books, book) {
        books[book.id - 1] = book;

        this.props.onChangeBookItem(books);
        this.forceUpdate();
    }

    onDeleteBookItem(books, book, history) {
        const newBooks = books.filter((item) => item.id !== book.id);
        this.props.onDeleteBookItem(newBooks);
        history.push('/');
    }
}


const mapStateToProps = state => {

    return {
        books: state.data.books
    }
};
const mapDispatchToProps = dispatch => ({
    onChangeBookItem(books) {
        const payload = {
            books
        };

        dispatch({type: CHANGE_BOOK_ITEM, payload});
    },
    onDeleteBookItem(books) {
        const payload = {
            books
        };

        dispatch({type: DELETE_BOOK_ITEM, payload});
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(BookEditActionPage));