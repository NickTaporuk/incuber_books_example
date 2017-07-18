import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'

class IndexPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="content-wrapper">
                Content text
            </div>
        )
    }
}

function mapStateToProps(state) {}

export default connect(
    null,
    dispatch => ({})
)(withRouter(IndexPage));