
const addChild = function* addChild(firebase, {form}) {
    const userId = firebase.auth().currentUser.uid
    const childrenListRef = firebase.database().ref(`children/${userId}`)

    const newKey = childrenListRef.child('children').push().key;

    let updates = {};
    updates[`children/${userId}/${newKey}`] = form;

    firebase.database().ref().update(updates);
}

const updateChild = function* updateChild(firebase, {form}) {
}

export {addChild, updateChild}
