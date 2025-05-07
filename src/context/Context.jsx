import { createContext, useEffect, useState } from 'react';
import main from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("")
    const [recentPrompt, setRecentPrompt] = useState("")
    const [prevPrompts, setPrevPrompts] = useState([])
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");


    // const delayPara = (index, nextWord) => {
    //     setTimeout(function () {
    //         setResultData(prev => prev + nextWord)

    //     }, 75 * index)


    // }


    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }



    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if (prompt !== undefined) {
            response = await main(prompt)
            setRecentPrompt(prompt)

        } else {
            setPrevPrompts(prev => [...prev, input])
            setRecentPrompt(input);
            response = await main(input);
        }

        const response1 = response.split('\n');
        console.log(111111111111111111111111111111111111111111n)
        console.log()
        console.log(response1);
        let response2 = '';
        for (let i = 0; i < response1.length; i++) {

            if (response1[i] === '') {
                response2 += '<br/>';
                // response2 += '\n';

            }
            else {
                response2 += response1[i] + '\n';
                // response2 += response1[i] + '\n';
            }


        }
        console.log(2222222222222222222222222222222222222222222222222222222222222n)
        console.log()
        console.log(response2)

        // let i = 0;
        // // let bold = false;
        // // let result = '';
        // // while (i < response2.length) {
        // //     if (response2[i] === "*" && response2[i + 1] === "*") {
        // //         result += bold ? "</b>" : "<b>";
        // //         bold = !bold;
        // //         i += 2;
        // //     } else {
        // //         result += response2[i];
        // //         i++;
        // //     }
        // // }

        let i = 0;
        let bold = false;
        let inCodeBlock = false;
        let result = '';


        while (i < response2.length) {
            // Detect code block start/end (```)
            if (response2[i] === '`' && response2[i + 1] === '`' && response2[i + 2] === '`') {
                result += inCodeBlock ? '</code></pre>' : '<pre><code>';
                inCodeBlock = !inCodeBlock;
                i += 3;

            }
            // Handle bold (**text**) outside code blocks
            else if (!inCodeBlock && response2[i] === "*" && response2[i + 1] === "*") {
                result += bold ? "</b>" : "<b>";
                bold = !bold;
                i += 2;
            } 
            // Add <br/> outside code blocks
            else if (!inCodeBlock && response2[i] === '\n') {
                result += "<br/>";
                i++;
            }
            else {
                result += response2[i];
                i++;
            }
        }
        

        // while (i < response2.length) {
        //     // Detect code block start/end (```)
        //     if (response2[i] === '`' && response2[i + 1] === '`' && response2[i + 2] === '`') {
        //         result += inCodeBlock ? '</code></pre>' : '<pre><code>';
        //         inCodeBlock = !inCodeBlock;
        //         i += 3;
        //     }
        //     // Handle bold (**text**)
        //     else if (!inCodeBlock && response2[i] === "*" && response2[i + 1] === "*") {
        //         result += bold ? "</b>" : "<b>";
        //         bold = !bold;
        //         i += 2;
        //     } else {
        //         result += response2[i];
        //         i++;
        //     }
        // }

        console.log("ith bold tagZZ.....................................................................................")
        console.log();
        console.log();
        console.log();
        console.log(result);





        //     let response3 = response2.split("*   ");
        //     console.log(response3)
        //     console.log("This is resposee 3........ loop")


        //     let response4='';
        //     for(let i=0;i<response3.length;i++){

        //         response4+=response3[i]+"\n";
        //     }
        //    console.log(4444444444444444444444444444444444444444444444444444444444444n);
        // console.log(response4)










        // let headings = response.split("##");
        // console.log(headings);
        //    let responseArray= response.split("**");
        //    let newResponse="";
        //    for(let i=0;i<responseArray.length;i++){
        //     if(i===0 || i%2!==1){
        //         newResponse+=responseArray[i];
        //     }else{
        //         newResponse+="<b>"+responseArray[i]+"</b>"
        //     }
        //    }

        // let newResponse2 = newResponse.split("*").join("<br/>")

        // let newResponseArray = newResponse2.split(" ");
        // for (let i = 0; i < newResponseArray.length; i++) {
        //     const nextWord = newResponseArray[i];
        //     delayPara(i, nextWord + " ");
        // }

        let newResult = result.split("*").join("<br/>");
        console.log("theu i neReult...............................ith br/>")
        // console.log(newResult + "  ")
        // console.log()
        // console.log()
        // let newResultArray = newResult.split(" ");
        // for (let i = 0; i < newResultArray.length; i++) {
        //     const nextWord = newResultArray[i];
        //     delayPara(i, nextWord + " ");
        // }


        setLoading(false);
        setResultData(newResult)
        setInput("");



    }

    // useEffect(()=>{
    //     onSent("what is reactjs");
    // },[])

    const contextValue = {

        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;