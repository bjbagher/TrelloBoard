import { selectorFamily } from "recoil"
import { ADD_TODO, DEL_TODO, SELECT, MOVE_PREV, MOVE_NEXT, ADD_SWITCH } from "./actionTypes"
import { allStates, selectedState, dispatchState, addState } from "./store.js"

export const reducerSelector = selectorFamily({
    key: "reducerSelector",
    set: state => ({ get, set }) => {
        let all
        const action = get(dispatchState)
        switch (action.type) {
            case ADD_TODO:
                set(state, [...get(state), { id: get(state).length + 1, title: action.payload.title, priority: action.payload.priority, img: action.payload.img }])
                break
            case DEL_TODO:
                console.log(state, "delete")
                set(state, get(state).filter((t, i) => i !== action.payload))
                break
            case SELECT:
                set(selectedState, { id: action.payload.id, state: action.payload.state })
                break
            case MOVE_PREV:
                all = get(allStates)
                const prevState = all.states[all.id[state.key] - 1]
                set(prevState, [...get(prevState), { id: get(prevState).length + 1, title: action.payload.title, priority: action.payload.priority, img: action.payload.img }])
                break
            case MOVE_NEXT:
                all = get(allStates)
                const nextState = all.states[all.id[state.key] + 1]
                set(nextState, [...get(nextState), { id: get(nextState).length + 1, title: action.payload.title, priority: action.payload.priority, img: action.payload.img }])
                break
            case ADD_SWITCH:
                if (get(addState)) set(addState, false)
                else set(addState, action.payload)
                break
            default:
                throw new Error("Something has gone terribly wrong.")
        }
    }
})

