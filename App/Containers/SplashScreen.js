import React, {Component} from "react"
import {Image, View} from "react-native"
import {Button, FormInput, FormLabel} from 'react-native-elements'
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
            form: {
                email: '',
                password: ''
            }
        }

        this.loginUser = this.loginUser.bind(this)
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

    onValueChange(field, value) {
        const {form} = this.state
        form[field] = value
        this.setState({form})
    }

    loginUser() {
        const {form} = this.state
        this.props.loginUser(form.email, form.password)
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
                    <FormLabel>Email</FormLabel>
                    <FormInput autoCapitalize='none' keyboardType='email-address' onChangeText={this.onValueChange.bind(this, 'email')} value={this.state.form.email}/>
                    <FormLabel>Password</FormLabel>
                    <FormInput secureTextEntry onChangeText={this.onValueChange.bind(this, 'password')}
                               value={this.state.form.password}/>
                    <Button style={{marginTop: 10}} backgroundColor={Colors.green}
                            title='Login'
                            onPress={this.loginUser}/>
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
    loginUser: (email, password) => dispatch(AuthActions.loginUser(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
