import RNFirebase from 'react-native-firebase'
import AppConfig from '../Config/AppConfig'

const firebase = RNFirebase.initializeApp(AppConfig.firebaseConfig)

export default firebase