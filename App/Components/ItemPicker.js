import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Modal, View} from 'react-native'
import {Button, Header, List} from 'react-native-elements'
import NavItem from './NavItem'

import styles from './Styles/ItemPickerStyles'
import {Colors} from '../Themes'


export default class ItemPicker extends Component {
    static propTypes = {
        title: PropTypes.string,
        animationType: PropTypes.string,
        placeholder: PropTypes.string,
        onDonePress: PropTypes.func,
        label: PropTypes.string,
        multiple: PropTypes.bool
    }

    static defaultProps = {
        title: 'Select',
        animationType: 'slide',
        placeholder: '',
        label: '',
        onDonePress: () => {
        },
        multiple: false
    }


    constructor(props) {
        super(props)

        this.state = {
            modalVisible: false,
            selected: [],
        }

        this.onDonePress = this.onDonePress.bind(this)
    }

    onItemPress(item, index) {

        let selected = this.state.selected

        const selectedIndex = selected.indexOf(index)
        if (selectedIndex === -1) {
            selected.push(index)
        } else {
            selected.splice(selectedIndex, 1)
        }
        this.setState({selected}, () => {
            if (this.props.multiple === false) {
                this.onDonePress()
            }
        })

    }

    onDonePress() {
        this.setState({modalVisible: !this.state.modalVisible})
        this.props.onDonePress(this.state.selected)
    }

    isSelected(index) {
        return (this.state.selected.indexOf(index) !== -1)
    }

    render() {
        return (
            <View>
                <Button title={this.props.label}
                        onPress={() => this.setState({modalVisible: !this.state.modalVisible})}>
                </Button>
                <Modal
                    animationType={this.props.animationType}
                    transparent={false}
                    visible={this.state.modalVisible}
                    supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
                >
                    <View style={[styles.mainContainer, {
                        backgroundColor: Colors.steel,
                        justifyContent: 'center'
                    }]}>
                        <Header
                            outerContainerStyles={styles.navBarContainer}
                            leftComponent={<NavItem iconName='chevron-left' onPress={() => {
                                this.setState({modalVisible: !this.state.modalVisible})
                            }}/>}
                            centerComponent={{text: this.props.title, style: styles.navTitle}}
                            rightComponent={this.props.multiple === true? <NavItem text='Done' onPress={this.onDonePress}/> :  null}
                        />
                        <View style={styles.container}>
                            <List>
                                {React.Children.map(this.props.children,
                                    (child, i) => {
                                        const selected = this.isSelected(i)
                                        return React.cloneElement(child, {
                                            selected,
                                            onItemPress: this.onItemPress.bind(this, child, i)
                                        })
                                    })}
                            </List>
                        </View>
                    </View>
                </Modal>
            </View>)
    }
}
