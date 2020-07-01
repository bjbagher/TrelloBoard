import React from "react"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { selectedState, dispatchState, addState } from "../../store/store.js"
import { addTodo, selectTodo, delTodo, movePrev, moveNext } from "../../store/actionCreator.js"
import { reducerSelector } from "../../store/reducer.js"
import Card from "./Card/Card.js"
import Form from "@rjsf/core";

export default function Section({ state }) {
    const setDispatch = useSetRecoilState(dispatchState)
    const reducer = useSetRecoilState(reducerSelector(state))
    const addSwitch = useRecoilValue(addState)
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

    const handleAdd = ({ title, priority, img }) => {
        setDispatch(addTodo({ title, priority, img }))
        reducer()
        handleSelect(null)
        setDispatch({ type: "ADD_SWITCH", payload: state })
        reducer()
    }

    const handleSelect = id => {
        setDispatch(selectTodo(id, state))
        reducer()
    }

    const handleDelete = () => {
        setDispatch(delTodo(selected.id))
        reducer()
        handleSelect(null)
    }

    const handleMovePrev = (title, priority, img) => {
        handleDelete()
        setDispatch(movePrev({ title, priority, img }))
        reducer()
        handleSelect(null)
    }

    const handleMoveNext = (title, priority, img) => {
        handleDelete()
        setDispatch(moveNext({ title, priority, img }))
        reducer()
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
            {addSwitch === state && <Form schema={schema} onSubmit={(e) => handleAdd(e.formData)} autoFocus />}
        </section>
    )
}
