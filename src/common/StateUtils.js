import React from "react";

export const setStateValue = (component: React.Component, newValue) => {
    component.setState(previousState => {
        // console.log('previous state: ' + JSON.stringify(previousState))
        // console.log('newValue state: ' + JSON.stringify(newValue))
        replaceValues(previousState, newValue)
        // console.log('replaced state: ' + JSON.stringify(previousState))
        return previousState
    })
}

export function replaceValues(oldObject, newObject) {
    Object.keys(oldObject).forEach(((key, index) => {
        if (newObject[key] !== undefined) {
            oldObject[key] = newObject[key]
        } else if (oldObject[key] instanceof Object) {
            // Disable recursive call for now
            // replaceValues(oldObject[key], newObject)
        }
    }))
}

export function mergeChanges(oldObject, newObject) {
    Object.keys(oldObject).forEach(((key, index) => {
        if (newObject[key] !== undefined) {
            oldObject[key] = newObject[key]
        } else if (oldObject[key] instanceof Object) {
            // Disable recursive call for now
            // replaceValues(oldObject[key], newObject)
        }
    }))

    return {...oldObject}
}