import _ from 'lodash'

const addVcard = function* addVcard(firebase, {childKey, form}) {
    const userId = firebase.auth().currentUser.uid
    const key = `vcards/${userId}/${childKey}`
    const vcardsRef = firebase.database().ref(key)

    const newKey = vcardsRef.child(key).push().key;

    let updates = {};

    let data = _.omitBy(form, _.isObject)
    data.vaccines = _.mapValues(form.vaccines, () => true)
    data.dueAge = _.mapValues (form.dueAge, () => true)

    updates[`${key}/${newKey}`] = data

    firebase.database().ref().update(updates);
}

const updateVcard = function* updateVcard(firebase, {form}) {
}

export {addVcard, updateVcard}
