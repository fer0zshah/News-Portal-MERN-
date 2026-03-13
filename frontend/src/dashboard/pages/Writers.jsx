import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FiEye, FiUserPlus, FiUsers } from 'react-icons/fi'
import axios from 'axios'
import { base_url } from '../../config/config'
import storeContext from '../../context/storeContext'

const Writers = () => {
  const { store } = useContext(storeContext)
  const [writers, setWriters] = useState([])

  const get_writers = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/news/writers`, {
        headers: {
          'Authorization': `Bearer ${store.token}`
        }
      })
      setWriters(data.writers)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    get_writers()
  }, [])

  return (
    <div className='bg-white rounded-2xl border border-slate-100 shadow-sm'>
      
      {/* Header Area */}
      <div className='flex justify-between items-center px-6 py-5 border-b border-slate-100'>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex justify-center items-center'>
            <FiUsers className='text-lg' />
          </div>
          <h2 className='text-lg font-bold text-slate-800'>Writers List</h2>
        </div>
        
        <Link 
          to='/dashboard/writer/add' 
          className='px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm shadow-indigo-200'
        >
          <FiUserPlus /> Add Writer
        </Link>
      </div>

      {/* Table Area */}
      <div className='relative overflow-x-auto'>
        <table className='w-full text-sm text-left text-slate-600'>
          <thead className='text-xs text-slate-500 uppercase bg-slate-50 font-bold tracking-wider'>
            <tr>
              <th className='px-6 py-4'>No</th>
              <th className='px-6 py-4'>Name</th>
              <th className='px-6 py-4'>Category</th>
              <th className='px-6 py-4'>Role</th>
              <th className='px-6 py-4'>Image</th>
              <th className='px-6 py-4'>Email</th>
              <th className='px-6 py-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              writers.map((r, i) => (
                <tr key={i} className='bg-white border-b border-slate-50 hover:bg-slate-50/50 transition-colors' >
                  <td className='px-6 py-4 font-medium text-slate-800'>{i + 1}</td>
                  
                  <td className='px-6 py-4 font-bold text-slate-800 capitalize'>{r.name}</td>
                  
                  <td className='px-6 py-4'>
                    <span className='px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-[11px] font-bold uppercase tracking-wide'>
                      {r.category}
                    </span>
                  </td>
                  
                  <td className='px-6 py-4'>
                    <span className='px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[11px] font-bold uppercase tracking-wide'>
                      {r.role}
                    </span>
                  </td>
                  
                  <td className='px-6 py-4'>
                    <img 
                      className='w-10 h-10 rounded-full object-cover border-2 border-slate-100 shadow-sm' 
                      src={r.image || "https://res.cloudinary.com/dpj4vsqbo/image/upload/v1696952625/news/g7ihrhbxqdg5luzxtd9y.webp"} 
                      alt="profile" 
                    />
                  </td>
                  
                  <td className='px-6 py-4 text-slate-500 font-medium'>{r.email}</td>
                  
                  <td className='px-6 py-4'>
                    <div className='flex justify-start items-center'>
                      <Link 
                        to={`/dashboard/writer/${r._id}`} 
                        className='p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-200'
                      >
                        <FiEye className='text-lg' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default Writers