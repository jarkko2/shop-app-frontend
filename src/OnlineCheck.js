import Post from './Backend'
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';

export default function OnlineCheck() {
    const setEmailReducer = email => ({ type: 'SET_EMAIL', email })
    const setRoleReducer = role => ({ type: 'SET_ROLE', role })
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")

    useEffect(() => {
        PostOnlineCheck()
    }, [email, role]);

    const dispatch = useDispatch()

    function PostOnlineCheck(){
        Post('users/onlinecheck').then(responseData => {
            dispatch(setEmailReducer(responseData.user ? responseData.user.username : ""))
            dispatch(setRoleReducer(responseData.user ? responseData.role : ""))
            setEmail(email)     
            setRole(responseData.role)
        })
    }

    
    return(<></>)
}