import React, { useRef } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { dispatchState, selectedState } from "../../store/store.js"
import { addTodo, selectTodo, delTodo } from "../../store/actionCreator.js"
import { reducerSelector } from "../../store/reducer.js"
import Section from "./Section.js"

export default function NamedSection({ state, id }) {
    const stateVal = useRecoilValue(state)
    const setDispatch = useSetRecoilState(dispatchState)
    const reducer = useSetRecoilState(reducerSelector(state))
    const selected = useRecoilValue(selectedState)


    const handleSetInput = () => {
        setDispatch({ type: "ADD_SWITCH", payload: state })
        reducer()
    }

    const handleSelect = id => {
        setDispatch(selectTodo(id, state))
        reducer()
    }

    const handleDelete = () => {
        console.log("id")
        setDispatch(delTodo(selected.id))
        reducer()
        handleSelect(null)
    }

    return (
        <div>
            <div className="section-title">
                <h2 onClick={() => handleSelect(id)}>{state.key}</h2>
                <span>{stateVal.length}</span>
            </div>
            <Section key={`section-${state}-${id}`} state={state} />
            <div className="section-input">
                <button onClick={handleSetInput}>add</button>
                <button onClick={handleDelete}>del</button>
            </div>
        </div>
    )

}
