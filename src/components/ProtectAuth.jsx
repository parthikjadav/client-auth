import React, { useEffect, useState } from 'react'
import { api } from '../lib'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const ProtectAuth = ({ children }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
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
        }finally {
            setLoading(false);  // ✅ Set loading to false after request
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])

    if (user) {
       navigate("/")
    }

    if(loading){
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        )
    }
    
    return user ? null : <>{children}</>;
}

export default ProtectAuth