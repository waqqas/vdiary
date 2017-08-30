
const addVcard = function* addVcard(firebase, {child, form}) {
    const userId = firebase.auth().currentUser.uid
    const key = `vcards/${userId}/${child.key}`
    const vcardsRef = firebase.database().ref(key)

    const newKey = vcardsRef.child(key).push().key;

    let updates = {};
    updates[`${key}/${newKey}`] = form;

    firebase.database().ref().update(updates);
}

const updateVcard = function* updateVcard(firebase, {form}) {
}

export {addVcard, updateVcard}
