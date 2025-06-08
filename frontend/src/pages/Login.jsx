import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../admin/context/AdminContext'
import { DoctorContext } from '../admin/context/DoctorContext'
const Login = () => {
  const [role, setRole] = useState('user');
  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate()
  const { backendUrl, token, setToken,setUserData } = useContext(AppContext)
  const { setAToken } = useContext(AdminContext);
  const {setDToken} = useContext(DoctorContext)
  const {setDoctorData} =useContext(DoctorContext)
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {

      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        setUserData(data.userData);
      } else {
        toast.error(data.message)
      }

    } else {
      let loginUrl = backendUrl;
      if (role === 'user') loginUrl += '/api/user/login';
      else if (role === 'doctor') loginUrl += '/api/doctor/login';
      else if (role === 'admin') loginUrl += '/api/admin/login';
      try{
            console.log("Logging in as:", role);
            console.log("POST to:", loginUrl);
            console.log("With credentials:", { email, password });
            const { data } = await axios.post(loginUrl, { email, password })
            console.log('✅ Login response:', data);
            if (data.success) {
            // 1. Save userData or doctorData based on role
            if (role === 'doctor') {
              if (data.doctorData) {
                localStorage.setItem('doctorData', JSON.stringify(data.doctorData));
                setDoctorData(data.doctorData); // Only if setDoctorData is available from context
              } else {
                toast.error("Login did not return doctor details.");
              }
            } else {
              if (data.userData) {
                localStorage.setItem('userData', JSON.stringify(data.userData));
                setUserData(data.userData); // Only if setUserData is available from context
              } else {
                toast.error("Login did not return user details.");
              }
            }

            // 2. Set tokens and navigate as before
            if (role === 'admin') {
              localStorage.setItem('aToken', data.token);
              setAToken && setAToken(data.token);
              navigate('/admin-dashboard');
            } else if (role === 'doctor') {
              localStorage.setItem('dToken', data.token);
              setDToken && setDToken(data.token);
              navigate('/doctor-dashboard');
            } else {
              localStorage.setItem('token', data.token);
              setToken && setToken(data.token);
              navigate('/');
            }
          } else {
            toast.error(data.message);
          }

      } catch(error){
        console.error('Login error:', error);
        toast.error(error.response?.data?.message || "Login failed");
      }
      

      

    }

  }

  /*useEffect(() => {
    if (token && role==='user' ) {
      navigate('/')
    }
  }, [token,role])*/

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
        {state === 'Sign Up'
          ? <div className='w-full '>
            <p>Full Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required />
          </div>
          : null
        }
        {state === 'Login' &&
        <div className='w-full'>
          <p>Login as</p>
          <select value={role} onChange={(e) => setRole(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1'>
            <option value="user">Login as User</option>
            <option value="doctor">Login as Doctor</option>
            <option value="admin">Login as Admin</option>
          </select>
        </div>
      }
        <div className='w-full '>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>{state === 'Sign Up' ? 'Create account' : 'Login'}</button>
        {state === 'Sign Up'
          ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login