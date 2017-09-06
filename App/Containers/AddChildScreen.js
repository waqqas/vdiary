import React, {Component} from "react"
import {Text, TouchableOpacity, View} from "react-native"
import {ButtonGroup, FormInput, FormLabel, Header} from 'react-native-elements'
import {connect} from 'react-redux'
import _ from 'lodash'
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker'
// Styles
import {Colors} from '../Themes'
import styles from './Styles/AddChildScreenStyle'
import NavItem from '../Components/NavItem'
import ChildActions from '../Redux/ChildRedux'

class AddChildScreen extends Component {
    static navigationOptions = ({navigation}) => {

        let title = 'Add Child'
        let onLeftButtonPress = null
        let onRightButtonPress = null

        if (navigation.state.params) {
            onLeftButtonPress = navigation.state.params.onLeftButtonPress
            onRightButtonPress = navigation.state.params.onRightButtonPress
        }


        const header = (
            <Header
                outerContainerStyles={styles.navBarContainer}
                leftComponent={<NavItem onPress={onLeftButtonPress} iconName='chevron-left'/>}
                centerComponent={{text: title, style: styles.navTitle}}
                rightComponent={<NavItem onPress={onRightButtonPress} text='Add'/>}
            />)

        return ({
            header
        })
    }

    constructor(props) {
        super(props)

        this.state = {
            form: {
                name: null,
                gender: null,
                dob: new Date()
            },
            picker: {
                dob: false
            },
            adding: false
        }
        this.gender = ['male', 'female']
    }

    componentDidMount() {
        this.props.navigation.setParams({
            onLeftButtonPress: this.onLeftButtonPress.bind(this),
            onRightButtonPress: this.onRightButtonPress.bind(this),
        })
    }

    onLeftButtonPress() {
        this.props.navigation.goBack()
    }

    onRightButtonPress() {
        this.props.addChild(this.state.form)
        this.props.navigation.goBack()
    }

    onValueChange(field, value) {
        const {form} = this.state
        form[field] = value
        this.setState({form})
    }

    onIndexChange(field, index) {
        const {form} = this.state
        form[field] = this[field][index]
        this.setState({form})
    }

    onDatePicked(field, date) {
        const {form} = this.state
        date.setUTCHours(0, 0, 0, 0)

        form[field] = date
        this.setState({form})
        this.hideDatePicker(field)
    }

    showDatePicker(pickerName) {
        const {picker} = this.state
        picker[pickerName] = true

        this.setState({picker})
    }

    hideDatePicker(pickerName) {
        const {picker} = this.state
        picker[pickerName] = false

        this.setState({picker})
    }

    render() {
        return (
            <View style={[styles.mainContainer, {
                backgroundColor: Colors.steel,
                justifyContent: 'center'
            }]}>
                <View style={styles.container}>
                    <FormLabel>Name</FormLabel>
                    <FormInput onChangeText={this.onValueChange.bind(this, 'name')}/>
                    <ButtonGroup
                        onPress={this.onIndexChange.bind(this, 'gender')}
                        selectedIndex={this.gender.indexOf(this.state.form.gender)}
                        buttons={this.gender.map((value) => (_.upperFirst(value)))}
                        containerStyle={{height: 50}}/>
                    <FormLabel>Date of birth</FormLabel>
                    <TouchableOpacity onPress={this.showDatePicker.bind(this, 'dob')}>
                        <FormLabel>{moment(this.state.form.dob).format('MMMM Do YYYY')}</FormLabel>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.picker.dob}
                        onConfirm={this.onDatePicked.bind(this, 'dob')}
                        date={this.state.form.dob}
                        onCancel={this.hideDatePicker.bind(this, 'dob')}
                        titleIOS='Pick date of birth'
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => ({
    addChild: (form) => dispatch(ChildActions.addChild(form))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddChildScreen)
