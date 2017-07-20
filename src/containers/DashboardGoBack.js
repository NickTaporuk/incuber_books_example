import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './../components/goBackHeader/GoBackHeader';
import Sidebar from './../components/sidebar/Sidebar';

export default (ComposedComponent) => {
    class DashboardGoBack extends Component {

        render() {
            return(
                <div>
                    <Header/>
                    <Sidebar/>
                    <ComposedComponent {...this.props} />
                </div>
            )
        }
    }

    DashboardGoBack.displayName = `DashboardGoBack(${ComposedComponent.displayName || ComposedComponent.name || 'ComposedComponent'})`;

    const mapStateToProps = state => ({});

    const mapDispatchToProps = dispatch => ({});

    return connect(mapStateToProps, mapDispatchToProps)(DashboardGoBack);
}