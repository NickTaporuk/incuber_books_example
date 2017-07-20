import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
    spinnerContainer : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px'
    },
    spinnerBox : {
        width: '300px',
        margin: '5px',
        textAlign: 'center'
    }
};

class Spinner extends Component {

    render() {
        return (
            <div style={styles.spinnerContainer}>

                <div className="box" style={styles.spinnerBox}>
                    <CircularProgress { ...this.props } />
                </div>

            </div>
        )
    }
}

export default Spinner;