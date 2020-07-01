import { ADD_TODO, DEL_TODO, SELECT, MOVE_NEXT, MOVE_PREV } from "./actionTypes.js"

export const addTodo = input => ({
    type: ADD_TODO, payload: input
})

export const selectTodo = (id, state) => ({
    type: SELECT, payload: { id, state }
})

export const delTodo = id => ({
    type: DEL_TODO, payload: id
})

export const movePrev = temp => ({
    type: MOVE_PREV, payload: temp
})

export const moveNext = temp => ({
    type: MOVE_NEXT, payload: temp
})