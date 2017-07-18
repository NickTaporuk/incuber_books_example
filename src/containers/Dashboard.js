import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './../components/header/Header'

export default (ComposedComponent) => {
    class Dashboard extends Component {
        constructor(props) {
            super(props);
        }

        render() {
            return(
                <div>
                    <Header/>
                    <ComposedComponent {...this.props} />
                </div>
            )
        }
    }

    Dashboard.displayName = `Dashboard(${ComposedComponent.displayName || ComposedComponent.name || 'ComposedComponent'})`;

    const mapStateToProps = state => {};

    const mapDispatchToProps = dispatch => ({});

    return connect(mapStateToProps, mapDispatchToProps)(Dashboard);
}