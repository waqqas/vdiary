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
    iconType: PropTypes.string
  }

  static defaultProps = {
    onPress: () => {
    },
    text: '',
    iconName: '',
    iconType: 'material-community'
  }

  render() {
    const {iconName, iconType, onPress, text} = this.props

    return (<TouchableOpacity onPress={onPress} style={styles.navButton}>
        {iconName !== '' &&
        <Icon type={iconType} name={iconName} style={styles.navButtonIcon} color={Colors.green}
              size={Fonts.size.h5}/>}
        {text !== '' && <Text style={styles.navButtonText}>{text}</Text>}
      </TouchableOpacity>
    )
  }
}
