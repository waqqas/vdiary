import React, {Component} from "react"
import {Image, ListView, View} from 'react-native'
import {Header, List, ListItem, SearchBar} from 'react-native-elements'
import firebase from '../Libs/Firebase'
import {connect} from 'react-redux'
// Styles
import {Colors, Metrics} from '../Themes'
import styles from './Styles/ChildListScreenStyle'
import NavItem from '../Components/NavItem'
import FirebaseActions from '../Redux/FirebaseRedux'

class ChildListScreen extends Component {
    static navigationOptions = ({navigation}) => {

        let title = 'Children'
        let onLeftButtonPress = null
        let onRightButtonPress = null

        if (navigation.state.params) {
            onLeftButtonPress = navigation.state.params.onLeftButtonPress
            onRightButtonPress = navigation.state.params.onRightButtonPress
        }


        const header = (
            <Header
                outerContainerStyles={styles.navBarContainer}
                leftComponent={<NavItem onPress={onLeftButtonPress} iconName='menu'/>}
                centerComponent={{text: title, style: styles.navTitle}}
                rightComponent={<NavItem onPress={onRightButtonPress} iconName='plus'/>}
            />)

        return ({
            header
        })
    }

    constructor(props) {
        super(props)

        this.state = {
            searchText: '',
        }

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }

    componentDidMount() {
        const currentUser = firebase.auth().currentUser

        if(currentUser){
            this.childrenListRef = firebase.database().ref(`children/${currentUser.uid}`)
            this.props.addRef('children', this.childrenListRef)
        }

        this.props.navigation.setParams({
            onLeftButtonPress: this.onLeftButtonPress.bind(this),
            onRightButtonPress: this.onRightButtonPress.bind(this),
        })
    }

    componentWillUnmount() {
        this.props.removeRef(this.childrenListRef)
    }

    onLeftButtonPress() {
        this.props.navigation.navigate('DrawerOpen')
    }

    onRightButtonPress() {
        this.props.navigation.navigate('AddChildScreen', {child: null})
    }

    searchChild(searchText) {
        this.setState({searchText})
    }

    onShowChild(child) {
        // this.props.selectChild(child)
        // this.props.navigation.navigate('ChildScreen')
    }

    renderChild(child, sectionId, key) {
        return (
            <ListItem
                style={styles.listItem}
                leftIcon={<Image style={{height: 60, width: 60, marginRight: Metrics.marginHorizontal}}
                                 source={{uri: 'http://via.placeholder.com/60x60'}}/>}
                chevronColor={Colors.snow}
                onPress={this.onShowChild.bind(this, child)}
                key={key}
                title={child.name}
                titleContainerStyle={styles.listTitleContainer}
                titleStyle={styles.listTitle}
            />)
    }

    renderChildList() {
        return (<List style={styles.listContainer}>
            <ListView
                renderRow={this.renderChild.bind(this)}
                dataSource={this.ds.cloneWithRows(this.props.children)}
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
                    <SearchBar lightTheme onChangeText={this.searchChild.bind(this)} placeholder='Search Children'
                               clearIcon
                               textInputRef='searchText'/>
                    {this.renderChildList()}
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        children: state.firebase.children
    }
}

const mapDispatchToProps = (dispatch) => ({
    addRef: (key, ref) => dispatch(FirebaseActions.addRef(key, ref)),
    removeRef: (ref) => dispatch(FirebaseActions.removeRef(ref)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChildListScreen)
