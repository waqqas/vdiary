import {StyleSheet} from "react-native";
import {ApplicationStyles, Metrics} from "../../Themes/"

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    ...ApplicationStyles.navBar,
    form: {
        marginHorizontal: Metrics.marginHorizontal,
        marginTop: Metrics.marginVertical
    },
    logo: {
        alignSelf: 'center'
    }

})
