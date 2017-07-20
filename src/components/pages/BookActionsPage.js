import React, {Component} from 'react';
import BookEditActionPage from './BookEditActionPage'
import {withRouter} from 'react-router';

class BookActionsPage extends Component {
    getActionByName(actionName) {

        switch (actionName) {
            case 'edit' : return BookEditActionPage;

            default : return BookEditActionPage;
        }
    }
    render() {
        const Action = this.getActionByName(this.props.match.params.action);
        return <Action { ...this.props }/>
    }
}

export default withRouter(BookActionsPage);