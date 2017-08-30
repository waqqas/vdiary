import React, {Component} from "react"
import {Image, ListView, View} from 'react-native'
import {Header, List, ListItem} from 'react-native-elements'
import firebase from '../Libs/Firebase'
import {connect} from 'react-redux'
// Styles
import {Colors} from '../Themes'
import styles from './Styles/VaccinationCardScreenStyle'
import NavItem from '../Components/NavItem'
import FirebaseActions from '../Redux/FirebaseRedux'

class VaccinationCardScreen extends Component {
    static navigationOptions = ({navigation}) => {

        let title = 'Vaccination Card'
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
                rightComponent={<NavItem onPress={onRightButtonPress} iconName='plus'/>}
            />)

        return ({
            header
        })
    }

    constructor(props) {
        super(props)

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }

    componentDidMount() {
        const currentUser = firebase.auth().currentUser
        const {child} = this.props.navigation.state.params

        this.ref = firebase.database().ref(`vcards/${currentUser.uid}/${child.key}`)

        this.props.addRef('vcards', this.ref)

        this.props.navigation.setParams({
            onLeftButtonPress: this.onLeftButtonPress.bind(this),
            onRightButtonPress: this.onRightButtonPress.bind(this),
        })
    }

    componentWillUnmount() {
        this.props.removeRef(this.ref)
    }

    onLeftButtonPress() {
        this.props.navigation.navigate('DrawerOpen')
    }

    onRightButtonPress() {
        const {child} = this.props.navigation.state.params
        this.props.navigation.navigate('AddItemScreen', {child})
    }

    onShowItem(item) {
        // this.props.selectItem(item)
        // this.props.navigation.navigate('ItemScreen')
    }

    renderItem(item, sectionId, key) {
        return (
            <ListItem
                style={styles.listItem}
                chevronColor={Colors.snow}
                onPress={this.onShowItem.bind(this, item)}
                key={key}
                title={item.name}
                subtitle={item.dueDate}
                titleContainerStyle={styles.listTitleContainer}
                titleStyle={styles.listTitle}
            />)
    }

    renderVaccinationCard() {
        return (<List style={styles.listContainer}>
            <ListView
                renderRow={this.renderItem.bind(this)}
                dataSource={this.ds.cloneWithRows(this.props.vcards)}
                enableEmptySections
            />
        </List>)
    }

    render() {
        return (
            <View style={[styles.mainContainer, {
                backgroundColor: Colors.steel
            }]}>
                <View style={styles.container}>
                    {this.renderVaccinationCard()}
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        vcards: state.firebase.vcards
    }
}

const mapDispatchToProps = (dispatch) => ({
    addRef: (key, ref) => dispatch(FirebaseActions.addRef(key, ref)),
    removeRef: (ref) => dispatch(FirebaseActions.removeRef(ref))
})

export default connect(mapStateToProps, mapDispatchToProps)(VaccinationCardScreen)
