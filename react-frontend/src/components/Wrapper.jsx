import React from 'react'

import { UpdateQuestionBank } from "../actions/paras"
import Chat from "./chat/Chat"
import { QuestionBank } from "./questionbank/QuestionBank"
import store from "../store"

export const Wrapper = () => {

    const questionBankChange = async (jsObject) => {
        store.dispatch(UpdateQuestionBank(jsObject))
    }
    return (
        <div>
            <div className="text-3xl px-12 pt-4 text-blue-700">ChatbotX</div>
            <div className="flex px-12 bg-grey-lightest font-sans">
                <div className="w-1/2">
                    <div className="py-2 text-lg">JSON</div>
                    <div className="">
                        <QuestionBank questionBankChange={questionBankChange} />
                    </div>
                </div>
                <div className="w-1/2 ml-16">
                    <div className="py-2 text-lg">Chatty</div>
                    <Chat />
                </div>
            </div>
        </div>
    )
}

export default Wrapper;
