import React, { useContext, useState } from 'react'
import './SideBar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context';
function SideBar() {

    const [extended, setExtended] = useState(false);
    const {onSent, prevPrompts,newChat, setRecentPrompt}=useContext(Context)

    function handler(){
        if(setExtended(false)){

            setExtended(true);
        }else{
            setExtended(false)
        }
    }
    const loadPrompt=async(prompt)=>{
        setRecentPrompt(prompt)
       await onSent(prompt)

    }


    return (
        <div className='sidebar'>
            <div className='top'>
                <img src={assets.menu_icon} onClick={()=>setExtended(prev=>!prev)} alt="" />
                <br />
                <div onClick={()=>newChat()} className='new-chat'>
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}

                </div>
                {extended ?

                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item,index)=>{
                            return(

                        <div onClick={()=>{loadPrompt(item)}} className="recent-entry">
                            <img src={assets.message_icon} alt="" />
                            <p>{item.slice(0,18)}...</p>
                        </div>
                            )
                        })}
                    </div>
                    : null}


            </div>
            <div className='bottom'>
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}

                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}

                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Setting</p> : null}

                </div>
            </div>


        </div>
    )
}

export default SideBar