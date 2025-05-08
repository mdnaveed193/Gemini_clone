import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import hljs from 'highlight.js';
// import 'highlight.js/styles/github.css'; // or another style
// import 'highlight.js/styles/atom-one-dark.css'; // Add your desired theme here
import 'highlight.js/styles/atom-one-dark.css';


import { ToastContainer, toast } from 'react-toastify';
  


import { useEffect } from 'react';

function Main() {


    const notify = () => {
        toast.warn("This functionality is not implemented")
    };



    const {onSent, recentPrompts, showResult, loading, resultData,input, setInput} = useContext(Context);

    useEffect(() => {
        if (!loading && resultData) {
          hljs.highlightAll();
        }
      }, [loading, resultData]);

      
    return (
        <div className='main'>
            <div className='nav'>
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult?<>
                




                <div className="greet">
                    <p><span>Hello, I'm Naveed</span></p>
                    <p>How can I help  you today</p>
                </div>
                <div className='cards'>
                    <div onClick={notify} className="card">
                        <p>What is a simple recipe for making delicious chocolate chip cookies?</p>
                        <img src={assets.compass_icon} alt="" />
                        <ToastContainer autoClose={2000}/>
                    </div>
                    <div onClick={notify} className="card">
                        <p>Explain the concept of photosynthesis in a way a child can understand.</p>
                        <img src={assets.bulb_icon} alt="" />
                        <ToastContainer autoClose={2000}/>
                    </div>
                    <div onClick={notify} className="card">
                        <p>What are some of the primary colors, and how can you mix them to create new ones?"
                        </p>
                        <img src={assets.message_icon} alt="" />
                        <ToastContainer autoClose={2000}/>
                    </div>
                    <div onClick={notify} className="card">
                        <p>Tell me a short, funny story about a cloud that thinks it's a sheep.</p>
                        <img src={assets.code_icon} alt="" />
                        <ToastContainer autoClose={2000}/>
                    </div>
                </div>
                </>: <div className='result'>
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompts}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading?<div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                            <hr />
                        </div>:
                        
                        <div className='content' dangerouslySetInnerHTML={{__html:resultData}}></div>
                        // <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }
                    </div>
                    
                    </div>}
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>{setInput(e.target.value)}} value={input} type="text" placeholder='Enter a prompt here' />
                    <div>
                        <img onClick={notify} src={assets.gallery_icon} alt="" />
                        <ToastContainer autoClose={2000}/>
                        <img onClick={notify} src={assets.mic_icon} alt="" />
                        <ToastContainer autoClose={2000}/>
                       {input?
                       <img onClick={()=>{onSent()}} src={assets.send_icon} alt="" />
                       :null} 
                    </div>
                </div>
                <p className="bottom-info">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda, temporibus!</p>
            </div>
            </div>

        </div>
    )
}

export default Main