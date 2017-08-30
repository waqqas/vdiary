import React from 'react'
import {StackNavigator, DrawerNavigator} from 'react-navigation'

import styles from './Styles/NavigationStyle'
import SplashScreen from "../Containers/SplashScreen";
import VaccinationCardScreen from "../Containers/VaccinationCardScreen";
import Drawer from "../Containers/Drawer";
import ChildListScreen from "../Containers/ChildListScreen";
import AddChildScreen from "../Containers/AddChildScreen";

// Manifest of possible screens
const PrimaryNav = StackNavigator({
    SplashScreen: {screen: SplashScreen},
    ChildListScreen: {screen: ChildListScreen},
    AddChildScreen: {screen: AddChildScreen},
    VaccinationCardScreen: {screen: VaccinationCardScreen}
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
