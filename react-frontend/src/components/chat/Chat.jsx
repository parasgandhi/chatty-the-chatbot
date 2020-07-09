import React, { useState, useEffect, useRef } from 'react'
import { connect } from "react-redux"
// import actions
import { UserMessage, SendMessage } from "../../actions/paras"

export const Chat = ({ store_props, userMessage, sendMessage }) => {
    // handle user message
    const [message, setMessage] = useState("")
    const [questionInQueue, updateQuestionInQueue] = useState(null)
    let [questionIndex, setQuestionIndex] = useState(null)

    const endOfMessages = useRef(null)
    let chat = store_props.messages
    let questions = store_props.questionBank
    const scrollToBottom = () => {
        endOfMessages.current.scrollIntoView({ behavior: "smooth" })
    }

    const initiateBot = () => {
        setQuestionIndex(0)
        if (questions.length > 0) {
            askQuestion(questions[0])
            updateQuestionInQueue(questions[0])
        }
    }

    const askQuestion = (question) => {
        sendMessage(question.question)
        if (question.type === "radio") {
            sendMessage("Please chose one")
            const options = question.options
            Object.keys(options).forEach((key, index) => {
                const option = options[key]
                sendMessage(key + " - " + option)
            })
        }
        else if (question.type === "text") {
            sendMessage("Please write your response")
        }
        else if (question.type === "checkbox") {
            sendMessage("Please chose one")
            const options = question.options
            Object.keys(options).forEach((key, index) => {
                const option = options[key]
                sendMessage(key + " - " + option)
            })
            setQuestionIndex(5)
        }
    }

    const validateResponse = (response) => {
        // console.log(response)
        userMessage(response)
        if (questionInQueue.type === "radio") {
            const options = questionInQueue.options
            let capitalizedOptions = []
            Object.keys(options).forEach((key, index) => {
                const option = options[key]
                capitalizedOptions.push(option.toUpperCase())
            })
            if (!capitalizedOptions.includes(response.toUpperCase())) {
                sendMessage("Oops, I didn't get that...Silly me, Can you say that again")
                askQuestion(questionInQueue)
                return
            }
        }

        sendMessage("Ooooo....")
        sendMessage("That's a good choice")
        let next_index = questionIndex + 1
        getNextQuestion(response, next_index)
    }

    const getNextQuestion = async (response, question_index) => {
        console.log(response, question_index)
        const nextQuestion = questions[question_index]
        if (nextQuestion === undefined) {
            sendMessage("It was nice talking to you :D")
            sendMessage("I am tired and gonna hit the bed, see you later...")
            sendMessage("sayonara... :P")
            return
        }
        if (nextQuestion["case"] !== undefined) {
            if (nextQuestion["case"].toUpperCase() === response.toUpperCase()) {
                console.log(nextQuestion)
                askQuestion(nextQuestion)
                updateQuestionInQueue(nextQuestion)
                return null
            }
            getNextQuestion(response, question_index + 1)
        }
    }

    // Function that handles user submission
    const handleClick = async (e) => {
        const code = e.keyCode || e.which;
        // If pressed enter key
        if (code === 13) {
            handleSendClick()
        }
    }

    const handleSendClick = async () => {
        if (questionInQueue !== null) {
            validateResponse(message)
        } else {
            userMessage(message)
            sendMessage()
        }
        setMessage("")
    }

    useEffect(scrollToBottom, [chat])
    useEffect(initiateBot, [questions])

    const getChatRow = (i, msg) => {
        return (
            <div key={i}>
                {msg.type === "bot" ?
                    <div className="grid grid-cols-12 grid-flow-col">
                        <span className=""><img className="p-1 border-solid rounded border border-teal-400" style={{ height: "35px" }} src="https://img.icons8.com/plasticine/100/000000/bot.png" alt="bot" /></span>
                        <span className="col-span-11"><div className={msg.type}>{msg.message}</div></span>
                    </div>
                    :
                    <div className="grid grid-cols-12 grid-flow-col">
                        <span className="col-span-11"><div className={msg.type}>{msg.message}</div></span>
                        <span className="py-2 ml-2 text-right"><img style={{ height: "35px" }} src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-4.png" alt="user" /></span>
                    </div>
                }
            </div>
        )
    }

    return (
        <>
            <div className="box border rounded chat shadow-2xl">
                <div className="mx-8">
                    <div className="mt-8 box border shadow-2xl shadow-inner rounded-lg">
                        <div className="bg-gray-200 m-2 historyContainer rounded-lg">
                            {chat.length === 0 ? "" : chat.map((msg, i) => { return getChatRow(i, msg) })}
                            <div ref={endOfMessages}></div>
                        </div>
                    </div>
                    <div className="flex justify-between my-2">
                        <div className="box border my-2 w-3/4">
                            <input className="w-full p-2 bg-gray-200 shadow-2xl shadow-inner" id="chatbot" onChange={(e) => setMessage(e.target.value)} onKeyPress={handleClick} value={message}></input>
                        </div>
                        <div onClick={handleSendClick} className="box border rounded-sm text-center shadow shadow-2xl cursor-pointer ml-4 my-2 w-1/4 bg-gray-400 ">
                            <div className="my-2 hover:underline">SEND</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    store_props: state.paras,
})
export default connect(mapStateToProps, { userMessage: UserMessage, sendMessage: SendMessage })(Chat);