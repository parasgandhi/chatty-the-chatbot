// import types
import {
    INPUT_SUCCESS,
    INPUT_FAIL,
    SESSION_FAIL,
    SESSION_SUCCESS,
    MESSAGE_SUCCESS,
    MESSAGE_FAIL,
    QUESTION_BANK_UPDATE
} from "../actions/types"

// Initial State
const initialState = {
    messages: [],
    questionBank: []
}

// Switch statement - update State
export default (state = initialState, action) => {
    const { type, payload } = action;
    let { messages, questionBank } = state;

    console.log(type, payload)
    switch (type) {
        case INPUT_SUCCESS:
            messages = [...messages, { message: payload, type: "user" }]
            return {
                ...state,
                messages,
            }
        case INPUT_FAIL:
            return {
                ...state,
            }
        case SESSION_SUCCESS:
            localStorage.setItem("session", payload["session_id"])
            return {
                ...state,
            }
        case SESSION_FAIL:
            return {
                ...state,
            }
        case MESSAGE_SUCCESS:
            messages = [...messages, { message: payload, type: "bot" }]
            return {
                ...state,
                messages,
            }
        case MESSAGE_FAIL:
            return {
                ...state,
            }
        case QUESTION_BANK_UPDATE:
            questionBank = payload
            return {
                ...state,
                questionBank
            }
        default:
            return {
                ...state,
            }
    }
}