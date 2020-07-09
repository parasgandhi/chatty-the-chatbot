import React, { useState } from 'react'
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import sampleData from "../../assets/sampledata"

export const QuestionBank = (props) => {

    const [questionBank, setQuestionBank] = useState(sampleData)
    
    const jsonBoxChange = (onChangeObj) => {
        console.log(onChangeObj.jsObject)
        setQuestionBank(onChangeObj.jsObject)
    }

    const initateBot = async () => {
        props.questionBankChange(questionBank)
    }

    return (
        <>
            <div className="box border rounded flex flex-col shadow shadow-2xl">
                {/* <div className="box__title bg-grey-lighter px-3 py-2 border-b"><h3 className="text-sm text-grey-darker font-medium">Source</h3></div> */}
                <div className="text-left">
                    <JSONInput
                        id='json_box'
                        placeholder={sampleData}
                        colors={{
                            string: "#DAA520" // overrides theme colors with whatever color value you want
                        }}
                        locale={locale}
                        height='550px'
                        theme="light_mitsuketa_tribute"
                        width="100%"
                        onChange={jsonBoxChange}
                    />
                </div>
            </div>
            <div className="flex justify-center px-4 py-4">
                <div onClick={initateBot} className="box border shadow-2xl hover:underline rounded-sm text-center cursor-pointer text-sm text-white bg-secondary px-8 py-2">
                    INITIATE CHATTY
                </div>
            </div>
        </>
    )
}
