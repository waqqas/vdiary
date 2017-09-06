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
    data.dueDate = form.dueDate.toISOString()
    data.lastUpdated = firebase.database.ServerValue.TIMESTAMP


    updates[`${key}/${newKey}`] = data

    firebase.database().ref().update(updates);
}

const updateVcard = function* updateVcard(firebase, {form}) {
}

export {addVcard, updateVcard}
