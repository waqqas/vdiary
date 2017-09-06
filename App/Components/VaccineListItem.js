import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {ListItem} from 'react-native-elements'

export default class VaccineListItem extends Component {
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
        const {item, onItemPress, selected} = this.props



        return (
            <ListItem onSwitch={onItemPress} title={item.shortName} subtitle={item.name} hideChevron switchButton={true} switched={selected}/>
        )
    }
}
