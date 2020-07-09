// Import types
import { INPUT_SUCCESS, INPUT_FAIL, SESSION_FAIL, SESSION_SUCCESS, MESSAGE_SUCCESS, MESSAGE_FAIL, QUESTION_BANK_UPDATE } from "./types"

// Fn that handles user message
export const UserMessage = (message) => async (dispatch) => {
    // console.log(message)
    try {
        dispatch({ type: INPUT_SUCCESS, payload: message })
    } catch (err) {
        console.log("dispatch failed", err)
        dispatch({ type: INPUT_FAIL })
    }
}

// Create a session - API Call
export const CreateSession = () => async (dispatch) => {
    try {
        // const res = api call to get session which will have a data dict with "session_id" as one key
        let res = { data: { 'session_id': '123abcd' } }
        dispatch({ type: SESSION_SUCCESS, payload: res.data })
    } catch (err) {
        dispatch({ type: SESSION_FAIL })
    }
}
// Sends the message to the bot -API Call

export const SendMessage = (message) => async (dispatch) => {
    try {
        // I would have loved to create an intent extraction model and create backend for this assignment
        // Sadly i dont have enough time
        if (message === undefined || message.length === 0 || message === null){
            message = "Cool!, I will keep that in mind"
        }
        dispatch({ type: MESSAGE_SUCCESS, payload: message })
    } catch (err) {
        dispatch({ type: MESSAGE_FAIL })
    }
}

// update json question bank
export const UpdateQuestionBank = (jsObject) => async (dispatch) => {
    try {
        dispatch({ type: QUESTION_BANK_UPDATE, payload: jsObject })
    } catch (err) {
        console.log(err)
    }
}