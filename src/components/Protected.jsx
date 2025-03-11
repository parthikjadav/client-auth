import React, { useEffect, useState } from 'react'
import { api } from '../lib'
import { useNavigate } from 'react-router-dom'

const Protected = ({ children }) => {
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const fetchUser = async () => {
        try {
            const res = await api.get("/auth/getUser")
            if (res.status === 403 || !res) {
                return navigate("/sign-in")
            }
            setUser(res.data.user)
        } catch (error) {
            console.log("error", error.message);
            navigate("/sign-in")
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])

    if (!user) {
       return navigate("/sign-in")
    }
    return (
        <>
            {children}
        </>
    )
}

export default Protected