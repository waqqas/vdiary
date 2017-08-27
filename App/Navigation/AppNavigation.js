import React from 'react'
import {StackNavigator, DrawerNavigator} from 'react-navigation'

import styles from './Styles/NavigationStyle'
import SplashScreen from "../Containers/SplashScreen";
import HomeScreen from "../Containers/HomeScreen";
import Drawer from "../Containers/Drawer";
import ChildListScreen from "../Containers/ChildListScreen";
import AddChildScreen from "../Containers/AddChildScreen";

// Manifest of possible screens
const PrimaryNav = StackNavigator({
    SplashScreen: {screen: SplashScreen},
    ChildListScreen: {screen: ChildListScreen},
    AddChildScreen: {screen: AddChildScreen},
    HomeScreen: {screen: HomeScreen}
}, {
    // Default config for all screens
    headerMode: 'float',
    initialRouteName: 'SplashScreen',
    navigationOptions: {
        headerStyle: styles.header
    }
})

const DrawerNav = DrawerNavigator({
    app: {screen: PrimaryNav},
}, {
    initialRouteName: 'app',
    headerMode: 'none',
    contentComponent: Drawer
})



export default DrawerNav
