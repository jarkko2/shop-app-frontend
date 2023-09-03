import Post from './Backend'
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';

export default function OnlineCheck() {
    const setEmailReducer = email => ({ type: 'SET_EMAIL', email })
    const [email, setEmail] = useState("")

    useEffect(() => {
        PostOnlineCheck()
    }, [email]);

    const dispatch = useDispatch()

    function PostOnlineCheck(){
        Post('users/onlinecheck').then(responseData => {
            dispatch(setEmailReducer(responseData.user ? responseData.user.username : ""))
            setEmail(email)     
        })
    }

    
    return(<></>)
}