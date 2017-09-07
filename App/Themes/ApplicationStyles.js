import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
    screen: {
        mainContainer: {
            flex: 1,
            backgroundColor: Colors.transparent
        },
        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        },
        container: {
            flex: 1,
            marginTop: Metrics.navBarHeight,
            paddingTop: Metrics.baseMargin,
            backgroundColor: Colors.transparent
        },
        section: {
            margin: Metrics.section,
            padding: Metrics.baseMargin
        },
        sectionText: {
            ...Fonts.style.normal,
            paddingVertical: Metrics.doubleBaseMargin,
            color: Colors.snow,
            marginVertical: Metrics.smallMargin,
            textAlign: 'center'
        },
        subtitle: {
            color: Colors.snow,
            padding: Metrics.smallMargin,
            marginBottom: Metrics.smallMargin,
            marginHorizontal: Metrics.smallMargin
        },
        titleText: {
            ...Fonts.style.h2,
            fontSize: 14,
            color: Colors.text
        }
    },
    tabBar: {
        tabBarIcon: {
            color: Colors.facebook
        },
        tabBarIconInactive: {
            color: Colors.steel
        }
    },
    navBar: {
        navBarContainer: {
            backgroundColor: Colors.navBar
        },
        navButton: {
            flexDirection: 'row',
            backgroundColor: Colors.transparent,
            alignItems: 'center'
        },
        navButtonIcon: {
            backgroundColor: Colors.transparent
        },
        navButtonText: {
            fontSize: Fonts.size.h5,
            color: Colors.green,
            paddingLeft: Metrics.marginHorizontal
        },
        navButtonTextDisabled: {
            fontSize: Fonts.size.h5,
            color: Colors.steel,
            paddingLeft: Metrics.marginHorizontal
        },
        navTitle: {
            fontSize: Fonts.size.h5,
            color: Colors.green,
            backgroundColor: Colors.transparent
        }
    },
    list: {
        listContainer: {
            flex: 1,
            backgroundColor: Colors.transparent
        },
        listItem: {
            backgroundColor: Colors.steel,
            paddingVertical: Metrics.baseMargin,
            borderWidth: 1,
            borderBottomColor: Colors.border
        },
        listTitle:{
            color: Colors.snow,
            fontFamily: Fonts.type.bold,
            fontSize: Fonts.size.input,
            width: Metrics.screenWidth - 100
        },
        listSubtitle: {
            color: Colors.steel,
            fontSize: Fonts.size.medium,
            width: Metrics.screenWidth - 100
        },
        listTitleContainer: {
            width: Metrics.screenWidth - 100
        },
        listSubtitleContainer: {
            width: Metrics.screenWidth - 100
        }
    },
    drawer:{
        drawerHeading: {
            marginVertical: Metrics.marginVertical,
            fontFamily: Fonts.type.bold,
            fontSize: Fonts.size.h5
        }
    },
    darkLabelContainer: {
        padding: Metrics.smallMargin,
        paddingBottom: Metrics.doubleBaseMargin,
        borderBottomColor: Colors.border,
        borderBottomWidth: 1,
        marginBottom: Metrics.baseMargin
    },
    darkLabel: {
        fontFamily: Fonts.type.bold,
        color: Colors.snow
    },
    groupContainer: {
        margin: Metrics.smallMargin,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    sectionTitle: {
        ...Fonts.style.h4,
        color: Colors.coal,
        backgroundColor: Colors.ricePaper,
        padding: Metrics.smallMargin,
        marginTop: Metrics.smallMargin,
        marginHorizontal: Metrics.baseMargin,
        borderWidth: 1,
        borderColor: Colors.ember,
        alignItems: 'center',
        textAlign: 'center'
    }
}

export default ApplicationStyles
