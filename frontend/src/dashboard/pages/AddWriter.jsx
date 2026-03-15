import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { base_url } from '../../config/config'
import storeContext from '../../context/storeContext'
import { FiUserPlus, FiList, FiLoader } from 'react-icons/fi'

const AddWriter = () => {
  const navigate = useNavigate()
  const { store } = useContext(storeContext)

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    category: ""
  })
  
  const [loader, setLoader] = useState(false)

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const submit = async (e) => {
    e.preventDefault()
    try {
      setLoader(true)
      const { data } = await axios.post(`${base_url}/api/news/writer/add`, state, {
        headers: {
          'Authorization': `Bearer ${store.token}`
        }
      })
      setLoader(false)
      toast.success(data.message)
      navigate('/dashboard/writers')
    } catch (error) {
      setLoader(false)
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  const inputStyles = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 placeholder-slate-400"
  const labelStyles = "text-sm font-semibold text-slate-700 mb-1.5 block"

  return (
    <div className='bg-white rounded-2xl border border-slate-100 shadow-sm'>
      
      {/* Header Area */}
      <div className='flex justify-between items-center px-6 py-5 border-b border-slate-100'>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex justify-center items-center'>
            <FiUserPlus className='text-lg' />
          </div>
          <h2 className='text-lg font-bold text-slate-800'>Add New Writer</h2>
        </div>
        
        <Link 
          to='/dashboard/writers' 
          className='px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-medium text-sm hover:bg-slate-100 transition-colors flex items-center gap-2 border border-slate-200'
        >
          <FiList /> Writer List
        </Link>
      </div>

      {/* Form Area */}
      <div className='p-6'>
        <form onSubmit={submit}>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            {/* Name Input */}
            <div>
              <label className={labelStyles} htmlFor="name">Full Name</label>
              <input 
                onChange={inputHandler} 
                value={state.name} 
                required 
                type="text" 
                placeholder='e.g. John Doe' 
                name='name' 
                id='name'
                className={inputStyles} 
              />
            </div>

            {/* Category Select */}
            <div>
              <label className={labelStyles} htmlFor="category">Specialty Category</label>
              <select 
                onChange={inputHandler} 
                value={state.category} 
                required 
                name='category' 
                id='category' 
                className={inputStyles} 
              >
                <option value="">--- Select Category ---</option>
               <option value="National">National</option>
                <option value="Politics">Politics</option>
                <option value="International">International</option>
                <option value="Technology">Technology</option>
                <option value="Sports">Sports</option>
                <option value="Culture">Culture</option>
                <option value="Economy">Economy</option>
                <option value="Education">Education</option>
                <option value="Opinion">Opinion</option>
              </select>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
            {/* Email Input */}
            <div>
              <label className={labelStyles} htmlFor="email">Email Address</label>
              <input 
                onChange={inputHandler} 
                value={state.email} 
                required 
                type="email" 
                placeholder='writer@example.com' 
                name='email' 
                id='email'
                className={inputStyles} 
              />
            </div>

            {/* Password Input */}
            <div>
              <label className={labelStyles} htmlFor="password">Temporary Password</label>
              <input 
                onChange={inputHandler} 
                value={state.password} 
                required 
                type="password" 
                placeholder='Enter a secure password' 
                name='password' 
                id='password'
                className={inputStyles} 
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className='flex justify-end pt-4 border-t border-slate-100'>
            <button 
              type="submit"
              disabled={loader} 
              className='px-6 py-2.5 bg-indigo-600 rounded-xl text-white font-medium hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm shadow-indigo-200' 
            >
              {loader ? (
                <>
                  <FiLoader className='animate-spin' /> Processing...
                </>
              ) : (
                'Create Writer Account'
              )}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default AddWriter