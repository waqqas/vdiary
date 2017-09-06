import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {ListItem} from 'react-native-elements'

export default class SelectListItem extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        onItemPress: PropTypes.func,
        selected: PropTypes.bool
    }

    static defaultProps = {
        onItemPress: () => {
        },
        selected: false
    }

    render() {
        const {item, onItemPress} = this.props

        return (
            <ListItem onPress={onItemPress} title={item.label} hideChevron/>
        )
    }
}
