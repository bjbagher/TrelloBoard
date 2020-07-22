import React from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { dispatchState, selectedState } from "../../store/store.js"
import { addForm, selectTodo, delTodo } from "../../store/actionCreator.js"
import { reducerSelector } from "../../store/reducer.js"
import Section from "./Section/Section.js"

export default function SectionContainer({ state, id }) {

    const stateVal = useRecoilValue(state)
    const setDispatch = useSetRecoilState(dispatchState)
    const reducer = useSetRecoilState(reducerSelector(state))
    const selected = useRecoilValue(selectedState)

    const dispatch = action => {
        setDispatch(action)
        reducer()
    }

    const handleSetInput = () => {
        dispatch(addForm(state))
    }

    const handleSelect = id => {
        dispatch(selectTodo(id))
    }

    const handleDelete = () => {
        dispatch(delTodo(selected.id))
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
