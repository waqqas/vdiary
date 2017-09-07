import React, {Component, PropTypes} from 'react'
import {Text, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'

import styles from './Styles/NavItemStyles'
import {Colors, Fonts} from '../Themes'

export default class NavItem extends Component {

    static propTypes = {
        onPress: PropTypes.func,
        text: PropTypes.string,
        iconName: PropTypes.string,
        iconType: PropTypes.string,
        disabled: PropTypes.bool
    }

    static defaultProps = {
        onPress: () => {
        },
        text: '',
        iconName: '',
        iconType: 'material-community',
        disabled: false
    }

    render() {
        const {iconName, iconType, onPress, text, disabled} = this.props

        return (<TouchableOpacity onPress={!disabled ? onPress : () => {
            }} style={styles.navButton}>
                {iconName !== '' &&
                <Icon type={iconType} name={iconName} style={styles.navButtonIcon}
                      color={disabled ? Colors.steel : Colors.green}
                      size={Fonts.size.h5}/>}
                {text !== '' &&
                <Text style={disabled ? styles.navButtonTextDisabled : styles.navButtonText}>{text}</Text>}
            </TouchableOpacity>
        )
    }
}
