import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors} from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    ...ApplicationStyles.list,
    ...ApplicationStyles.drawer,
    menuTitle: {
        color: Colors.charcoal
    }
})
