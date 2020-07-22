import React, { useRef } from "react"
import { useRecoilState } from "recoil"
import SectionContainer from "./SectionContainer/SectionContainer.js"
import { allStates, generateAtom } from "../store/store.js"


export default function Board() {
    const [states, setStates] = useRecoilState(allStates)
    const input = useRef()

    return (
        <>
            <div className="outer-input">

                <h2>Add Todo List:</h2>
                <input ref={input}></input>
                <button onClick={() => setStates({
                    states: [...states.states, generateAtom(input.current.value)],
                    id: { ...states.id, [input.current.value]: states.states.length }
                })}>
                    add</button>
            </div>
            <div className="board">
                <div className="outer-section">
                    {states.states.map((todo, i) => <SectionContainer key={`name-${todo}-${i}`} i={i} state={todo} />)}
                </div>
            </div>
        </>
    )
}