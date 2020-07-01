import { atom } from "recoil"


export const selectedState = atom({
    key: "selectedState",
    default: { id: null, state: null }
})

export const dispatchState = atom({
    key: "dispatchState",
    default: {}
})

export const addState = atom({
    key: "addState",
    default: false
})

export const allStates = atom({
    key: "allStates",
    default: { states: [], id: {} }
})

export const generateAtom = name => {
    return atom({
        key: `${name}`,
        default: []
    })
}
