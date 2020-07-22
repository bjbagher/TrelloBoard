import React from "react"
import { useRecoilValue } from "recoil"
import { selectedState, allStates } from "../../../../store/store.js"
import phone from "../../../../imgs/phone.png"
import calendar from "../../../../imgs/calendar.png"
import docs from "../../../../imgs/docs.png"
import email from "../../../../imgs/email.png"
import podcast from "../../../../imgs/podcast.png"
import chat from "../../../../imgs/chat.png"

const imgMap = {
    docs,
    phone,
    calendar,
    email,
    podcast,
    chat
}



export default function Card({ id, todo, select, state, isSelected, handleMovePrev, handleMoveNext }) {
    const selected = useRecoilValue(selectedState)
    let n = 1
    console.log("card", n++)

    const all = useRecoilValue(allStates)
    console.log("todo", todo)
    return (
        <div className="outer-card">
            {isSelected && all.id[state.key] !== 0 ? <button onClick={() => isSelected && handleMovePrev(todo.title, todo.priority, todo.img)}>◀</button> : <></>}
            <div className={isSelected ? "selected" : "card"} onClick={() => select(id)} draggable>
                {todo.img && <img src={imgMap[todo.img]} width="100%" />}
                <div className={`priority-${todo.priority}`}></div>
                <div className="content">{todo.title}</div>
            </div>
            {isSelected && all.id[state.key] !== all.states.length - 1 ? <button onClick={() => isSelected && handleMoveNext(todo.title, todo.priority, todo.img)}>▶</button> : <></>}
        </div>
    )
}