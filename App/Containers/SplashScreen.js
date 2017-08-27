import React, {Component} from "react"
import {Image, View} from "react-native"
import {Button} from 'react-native-elements'
import firebase from '../Libs/Firebase'
import {NavigationActions} from 'react-navigation'
// Styles
import {Colors, Images} from '../Themes'
import {connect} from 'react-redux'
import styles from './Styles/SplashScreenStyle'
import AuthActions from '../Redux/AuthRedux'

class SplashScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return ({
            header: null
        })
    }

    constructor(props) {
        super(props)

        this.state = {
            showLogin: false,
        }

        this.loginUserWithFacebook = this.loginUserWithFacebook.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.success === true) {
            if (nextProps.loggedIn === false) {
                this.setState({showLogin: true})
            }
            else {
                // login successful
                // navigate to main screen
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'ChildListScreen'})
                    ]
                })
                this.props.navigation.dispatch(resetAction)
            }
        }
    }


    loginUserWithFacebook() {
        this.props.loginUserWithFacebook()
    }

    render() {
        const {showLogin} = this.state

        return (
            <View style={[styles.mainContainer, {
                backgroundColor: Colors.steel,
                justifyContent: 'center'
            }]}>
                <Image source={Images.logo} style={styles.logo} resizeMode='cover'/>
                {showLogin && (<View style={styles.form}>
                    <Button style={{marginTop: 10}} backgroundColor={Colors.facebook}
                            title='Login with Facebook'
                            onPress={this.loginUserWithFacebook}/>
                </View>)}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        success: state.startup.success,
        loggedIn: (firebase.auth().currentUser !== null)
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginUserWithFacebook: () => dispatch(AuthActions.loginUserWithFacebook())
})

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
