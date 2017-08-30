import React, {Component} from 'react'
import {StatusBar, View} from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import {connect} from 'react-redux'
import firebase from '../Libs/Firebase'
import StartupActions from '../Redux/StartupRedux'
import FirebaseActions from '../Redux/FirebaseRedux'
import ReduxPersist from '../Config/ReduxPersist'
// Styles
import styles from './Styles/RootContainerStyle'

class RootContainer extends Component {
    componentDidMount() {
        // if redux persist is not active fire startup action
        if (!ReduxPersist.active) {
            this.props.startup()
        }

        // Listen for authentication state to change.
        firebase.auth().onAuthStateChanged((user) => {
            this.props.updateUser()
        })
    }

    render() {
        return (
            <View style={styles.applicationView}>
                <StatusBar barStyle='dark-content'/>
                <ReduxNavigation/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        startupSuccess: state.startup.success
    }
}

const mapDispatchToProps = (dispatch) => ({
    startup: () => dispatch(StartupActions.startup()),
    updateUser: () => dispatch(FirebaseActions.updateUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
