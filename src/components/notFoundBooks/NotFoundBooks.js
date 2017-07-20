import React, {Component} from 'react';
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

class NotFoundBooks extends Component {

    render() {
        return (
            <div style={styles.spinnerContainer}>

                <div className="box" style={styles.spinnerBox}>
                    Book(s) not found.
                </div>

            </div>
        )
    }
}

export default NotFoundBooks ;