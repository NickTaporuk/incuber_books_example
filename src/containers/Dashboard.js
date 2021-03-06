import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './../components/header/Header';
import Sidebar from './../components/sidebar/Sidebar';

export default (ComposedComponent) => {
    class Dashboard extends Component {

        render() {
            return (
                <div>
                    <Header/>
                    <Sidebar/>
                    <ComposedComponent {...this.props} />
                </div>
            )
        }
    }

    Dashboard.displayName = `Dashboard(${ComposedComponent.displayName || ComposedComponent.name || 'ComposedComponent'})`;

    const mapStateToProps = state => ({});

    const mapDispatchToProps = dispatch => ({});

    return connect(mapStateToProps, mapDispatchToProps)(Dashboard);
}