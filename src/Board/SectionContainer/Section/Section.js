import React from "react"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { selectedState, dispatchState, addState } from "../../../store/store.js"
import { addForm, addTodo, selectTodo, delTodo, movePrev, moveNext } from "../../../store/actionCreator.js"
import { reducerSelector } from "../../../store/reducer.js"
import Card from "./Card/Card.js"
import Form from "@rjsf/core";

export default function Section({ state }) {

    let n = 1
    console.log("section", n++)

    const setDispatch = useSetRecoilState(dispatchState)
    const reducer = useSetRecoilState(reducerSelector(state))
    const showForm = useRecoilValue(addState)
    const selected = useRecoilValue(selectedState)
    const local = useRecoilValue(state)
    const schema = {
        title: "Todo",
        type: "object",
        required: ["title"],
        properties: {
            img: { type: "string", title: "Image", enum: ["phone", "calendar", "docs", "email", "podcast", "chat"] },
            priority: { type: "string", title: "Priority", enum: ["one", "two", "three"] },
            title: { type: "string", title: "Title", default: "A new task" }
        }
    }

    const dispatch = action => {
        setDispatch(action)
        reducer()
    }

    const handleAdd = ({ title, priority, img }) => {
        dispatch(addTodo({ title, priority, img }))
        handleSelect(null)
        dispatch(addForm(state))
    }

    const handleSelect = id => {
        dispatch(selectTodo({id, state}))
    }

    const handleDelete = () => {
        dispatch(delTodo(selected.id))
        handleSelect(null)
    }

    const handleMovePrev = (title, priority, img) => {
        handleDelete()
        dispatch(movePrev({ title, priority, img }))
        handleSelect(null)
    }

    const handleMoveNext = (title, priority, img) => {
        handleDelete()
        dispatch(moveNext({ title, priority, img }))
        handleSelect(null)
    }

    return (
        <section className="section">
            {local.map((todo, i) => <Card
                key={`card-${state}-${i}`}
                id={i} todo={todo} state={state}
                select={handleSelect}
                isSelected={selected.id === i && selected.state === state}
                handleMovePrev={handleMovePrev}
                handleMoveNext={handleMoveNext} />)}
            {showForm === state && <Form schema={schema} onSubmit={(e) => handleAdd(e.formData)} autoFocus />}
        </section>
    )
}
