import React, {Component} from "react"
import {Picker, Text, TouchableOpacity, View} from "react-native"
import {FormLabel, Header} from 'react-native-elements'
import {connect} from 'react-redux'
import _ from 'lodash'
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker'
// Styles
import firebase from '../Libs/Firebase'
import {Colors} from '../Themes'
import styles from './Styles/AddItemScreenStyle'
import NavItem from '../Components/NavItem'
import FirebaseActions from '../Redux/FirebaseRedux'
import VcardActions from '../Redux/VcardRedux'
import ItemPicker from '../Components/ItemPicker'
import VaccineListItem from "../Components/VaccineListItem";
import SelectListItem from "../Components/SelectListItem";

class AddItemScreen extends Component {
    static navigationOptions = ({navigation}) => {

        let title = 'Add Item'
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
                done: false,
                dueAge: 0,
                dueDate: null,
                givenDate: null,
                notes: '',
                vaccines: []
            },
            picker: {
                dueDate: false,
                givenDate: false
            },
            adding: false
        }
        this.gender = ['male', 'female']
    }

    componentDidMount() {
        const {childKey} = this.props.navigation.state.params
        const userId = firebase.auth().currentUser.uid

        this.agesRef = firebase.database().ref('ages')
        this.props.addRef('ages', this.agesRef)

        this.vaccinesRef = firebase.database().ref('vaccines')
        this.props.addRef('vaccines', this.vaccinesRef)

        this.currentChildRef = firebase.database().ref(`children/${userId}/${childKey}`)
        this.props.addRef('currentChild', this.currentChildRef)

        this.props.navigation.setParams({
            onLeftButtonPress: this.onLeftButtonPress.bind(this),
            onRightButtonPress: this.onRightButtonPress.bind(this),
        })
    }

    onLeftButtonPress() {
        this.props.navigation.goBack()
    }

    onRightButtonPress() {
        const {childKey} = this.props.navigation.state.params

        this.props.addVcard(childKey, this.state.form)
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

    onDatePicked(field, value) {
        const {form} = this.state
        form[field] = value
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

    onDonePress(formField, propName, selected) {

        let {form} = this.state
        const value = _.pick(this.props[propName], selected)
        form[formField] = value

        switch (formField) {
            case 'dueAge':
                const age = value[selected]
                form['dueDate'] = moment(this.props.child.dob).add(age.value, 'day').utcOffset(0).toDate()
                break
        }

        this.setState({form})
    }

    getVaccineLabel() {
        return _.map(this.state.form.vaccines, 'shortName').join(',')
    }

    getLabel(formField){
        if(this.state.form[formField]){
            return _.map(this.state.form[formField], 'label').join('')
        }
        else{
            return ''
        }
    }

    render() {
        return (
            <View style={[styles.mainContainer, {
                backgroundColor: Colors.steel,
                justifyContent: 'center'
            }]}>
                <View style={styles.container}>
                    <FormLabel>{this.state.form.name}</FormLabel>

                    <FormLabel>Vaccines</FormLabel>
                    <ItemPicker title='Select Vaccines'
                                onDonePress={this.onDonePress.bind(this, 'vaccines', 'vaccines')}
                                label={this.getVaccineLabel()} multiple buttonProps={{backgroundColor: Colors.green}}>
                        {_.map(this.props.vaccines, (vaccine, key) => {
                            return (<VaccineListItem key={key} item={vaccine}/>)
                        })}
                    </ItemPicker>

                    <FormLabel>Due Age</FormLabel>
                    <ItemPicker label={this.getLabel('dueAge')}
                                onDonePress={this.onDonePress.bind(this, 'dueAge', 'ages')}
                                buttonProps={{backgroundColor: Colors.green}}>
                        {_.map(this.props.ages, (age, key) => {
                            return (<SelectListItem key={key} item={age}/>)
                        })}
                    </ItemPicker>

                    <FormLabel>Due date</FormLabel>
                    <TouchableOpacity onPress={this.showDatePicker.bind(this, 'dueDate')}>
                        <FormLabel>{moment(this.state.form.dueDate).format('MMMM Do YYYY')}</FormLabel>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.picker.dueDate}
                        onConfirm={this.onDatePicked.bind(this, 'dueDate')}
                        date={this.state.form.dueDate}
                        onCancel={this.hideDatePicker.bind(this, 'dueDate')}
                        titleIOS='Pick due date'
                    />

                    <FormLabel>Given date</FormLabel>
                    <TouchableOpacity onPress={this.showDatePicker.bind(this, 'givenDate')}>
                        <FormLabel>{moment(this.state.form.givenDate).format('MMMM Do YYYY')}</FormLabel>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.picker.givenDate}
                        onConfirm={this.onDatePicked.bind(this, 'givenDate')}
                        date={this.state.form.givenDate}
                        onCancel={this.hideDatePicker.bind(this, 'givenDate')}
                        titleIOS='Pick given date'
                    />


                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ages: state.firebase.ages,
        vaccines: state.firebase.vaccines,
        child: state.firebase.currentChild
    }
}

const mapDispatchToProps = (dispatch) => ({
    addRef: (key, ref) => dispatch(FirebaseActions.addRef(key, ref)),
    removeRef: (ref) => dispatch(FirebaseActions.removeRef(ref)),

    addVcard: (childKey, form) => dispatch(VcardActions.addVcard(childKey, form))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddItemScreen)
