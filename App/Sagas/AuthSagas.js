const loginUser = function* loginUser(firebase, {email, password}) {
    firebase.auth().signInWithEmailAndPassword(email, password)
}

const logoutUser = function* logoutUser(firebase) {
    firebase.auth().signOut()
}

export {loginUser, logoutUser}