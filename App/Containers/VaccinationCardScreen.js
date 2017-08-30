import React, {Component} from "react"
import {View} from "react-native"
import {Header} from 'react-native-elements'
import {connect} from 'react-redux'
// Styles
import {Colors} from '../Themes'
import styles from './Styles/VaccinationCardScreenStyle'
import NavItem from '../Components/NavItem'

class VaccinationCardScreen extends Component {
    static navigationOptions = ({navigation}) => {

        let title = 'Home'
        let onLeftButtonPress = null
        let onRightButtonPress = null

        if (navigation.state.params) {
            onLeftButtonPress = navigation.state.params.onLeftButtonPress
            onRightButtonPress = navigation.state.params.onRightButtonPress
        }


        const header = (
            <Header
                outerContainerStyles={styles.navBarContainer}
                leftComponent={<NavItem onPress={onLeftButtonPress} iconName='bars'/>}
                centerComponent={{text: title, style: styles.navTitle}}
                rightComponent={<NavItem onPress={onRightButtonPress} iconName='search'/>}
            />)

        return ({
            header
        })
    }

    componentDidMount() {
        this.props.navigation.setParams({
            onLeftButtonPress: this.onLeftButtonPress.bind(this),
            onRightButtonPress: this.onRightButtonPress.bind(this),
        })
    }

    onLeftButtonPress() {
        this.props.navigation.navigate('DrawerOpen')
    }

    onRightButtonPress() {
    }

    render() {
        return (
            <View style={[styles.mainContainer, {
                backgroundColor: Colors.steel,
                justifyContent: 'center'
            }]}>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(VaccinationCardScreen)
