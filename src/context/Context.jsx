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
    const [query, setQuery] = useState("")




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
        // console.log()
        // console.log(response1);
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

        let i = 0;
        let bold = false;
        let inCodeBlock = false;
        let inCodeBlock2 = false;
        let result = '';


        while (i < response2.length) {
            // Detect code block start/end (```)
            if (response2[i] === '`' && response2[i + 1] === '`' && response2[i + 2] === '`') {
                result += inCodeBlock ? '</code></pre>' : '<pre><code>';
                inCodeBlock = !inCodeBlock;
                i += 3;

            }
            else if (response2[i] === '`') {
                result += inCodeBlock2 ? '</span>' : `<span id='pre-code'>`;
                inCodeBlock2 = !inCodeBlock2;
                i++;
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
        

       
        console.log("ith bold tagZZ.....................................................................................")
        console.log();
        console.log();
        console.log();
        console.log(result);





        let newResult = result.split("*").join("<br/>");
      

        setLoading(false);
        const queryHTML = `<p style='font-size:18px; font-weight:600'>${input}</p><br/>`;
setResultData(queryHTML + newResult);

        // setResultData(newResult)
        setInput("");



    }

   
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