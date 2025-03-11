import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import phoneImg from '/images/phone.jpg'
import axios from "axios"
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: ""
  })
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSuccess = async (credencials) => {
    try {
      const token = credencials.credential
      const res = await axios.post("http://localhost:3000/api/auth/google/callback", { token })
      console.log(res, "res");

      if (res.data.success) {
        toast.success('Successfully Signed Up!')
        localStorage.setItem("token", res.data.token)
        navigate("/")
      } else {
        toast.error('Failed Sign Up')
      }
    } catch (error) {
      console.log(error.message);
      toast.error('Failed Sign Up')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(formData, "formData");

      const res = await fetch("http://localhost:3000/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }) 
      const data = await res.json()
      if (data.success) {
        toast.success(data.message)
        localStorage.setItem("token", data.token)
        navigate("/")
      } else {
        toast.error(data.message)
      }
    } catch (e) {
      console.log(e.message);
      toast.error(e.message)
    }
  }
  return (
    <>
      <div className="container flex justify-center items-center h-[100vh] px-10 gap-10">
        <div className='left-side max-w-100 min-w-50  hidden md:block'>
          <img src={phoneImg} alt="phone image" width="100%" className='rounded-2xl bg-cover bg-center' />
        </div>
        <div className='right-side max-w-100 min-w-50'>
          <h1 className='text-4xl font-semibold text-center capitalize'>welcome to our website!</h1>
          <div className="google py-4">
            <GoogleOAuthProvider clientId={'971157560070-brgpslqhao4tqc91nk9k9fgdissd5p27.apps.googleusercontent.com'}>
              <GoogleLogin
                text='signup_with'
                shape='circle'
                onSuccess={handleSuccess}
                onError={() => {
                  console.log('signUp Failed');
                }}
              />
            </GoogleOAuthProvider>
          </div>
          <div className='w-full relative py-5'>
            <span className='w-45 bg-gray-200 h-[1px] absolute left-0'></span>
            <p className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-gray-500 text-sm font-semibold'>or</p>
            <span className='w-45 bg-gray-200 h-[1px] absolute right-0'></span>
          </div>
          <form className="sign-in-form" onSubmit={handleSubmit}>
            <label htmlFor="name" className='label'>Name</label>
            <input type="text" name="name" id="name" className='input' onChange={(e) => handleFormChange(e)} />
            <label htmlFor="email" className='label'>Email</label>
            <input type="email" name="email" id="email" className='input' onChange={(e) => handleFormChange(e)} />
            <label htmlFor="password" className='label'>Password</label>
            <input type="password" name="password" id="password" className='input' onChange={(e) => handleFormChange(e)} />
            <button className='button my-5'>Sign Up</button>
          </form>
          <div className="link-redirect text-center">
            <p className='text-gray-500 text-sm'>Already have an account? <Link to='/sign-in' className='text-blue-500'>Sign In</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp;