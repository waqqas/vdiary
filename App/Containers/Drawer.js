import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Image, ListView, View} from 'react-native';
import {NavigationActions} from 'react-navigation'
import {List, ListItem} from 'react-native-elements'
import firebase from '../Libs/Firebase'
// Styles
import styles from './Styles/DrawerStyle'
import AuthActions from '../Redux/AuthRedux'
import {Images} from '../Themes'


class Drawer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            menuItems: []
        }

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }

    componentDidMount() {
        this.onRefresh(this.props)
    }


    componentWillReceiveProps(nextProps) {
        this.onRefresh(nextProps)
    }

    onRefresh(props) {
        const {loggedIn} = props

        let menuItems = []

        if (loggedIn) {

            menuItems.push({
                text: 'Children',
                iconName: 'ios-briefcase',
                onPress: this.showScreen.bind(this, 'ChildListScreen')
            })

            // menuItems.push({
            //   text: 'About',
            //   iconName: 'ios-home',
            //   onPress: this.showScreen.bind(this, 'AboutScreen')
            // })

            menuItems.push({
                text: 'Logout',
                iconName: 'ios-log-out',
                onPress: this.logoutUser.bind(this)
            })
        }
        else {
        }

        this.setState({menuItems})

    }

    showScreen(routeName) {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName})
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    logoutUser() {
        this.props.logoutUser(null)
        this.props.navigation.navigate('SplashScreen')
    }

    renderMenu(menu) {
        return (
            <ListItem hideChevron title={menu.text} onPress={menu.onPress} titleStyle={styles.menuTitle}>
            </ListItem>
        )
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={{alignItems: 'center'}}>
                    <Image source={Images.background} style={{height: 50, width: 50}}/>
                </View>
                <List>
                    <ListView enableEmptySections renderRow={this.renderMenu.bind(this)}
                              dataSource={this.ds.cloneWithRows(this.state.menuItems)}/>
                </List>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: (firebase.apps.length > 0 && firebase.auth().currentUser !== null)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: (user) => dispatch(AuthActions.logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
