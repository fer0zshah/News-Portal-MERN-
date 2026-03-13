import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiEye, 
  FiFileText, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle 
} from 'react-icons/fi'
import axios from 'axios'
import { base_url } from '../../config/config'
import storeContext from '../../context/storeContext'

const WriterIndex = () => {
  const { store } = useContext(storeContext)
  const [loader, setLoader] = useState(false)
  const [activeNews, setActiveNews] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    active: 0,
    deactive: 0
  })

  useEffect(() => {
    const fetchWriterData = async () => {
      try {
        setLoader(true)
        // Backend automatically knows it's a writer and only sends THEIR news
        const { data } = await axios.get(`${base_url}/api/news`, {
          headers: {
            'Authorization': `Bearer ${store.token}`
          }
        })
        
        const myNews = data.news || []

        // Calculate Bob's personal stats
        setStats({
          total: myNews.length,
          pending: myNews.filter(n => n.status === 'pending').length,
          active: myNews.filter(n => n.status === 'active').length,
          deactive: myNews.filter(n => n.status === 'deactive').length
        })

        // Filter the table to only show Bob's active news
        setActiveNews(myNews.filter(n => n.status === 'active'))
        
        setLoader(false)
      } catch (error) {
        console.log(error)
        setLoader(false)
      }
    }

    fetchWriterData()
  }, [store.token])

  const statCards = [
    { title: 'My Total News', count: stats.total, icon: FiFileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'My Pending', count: stats.pending, icon: FiClock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'My Active', count: stats.active, icon: FiCheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'My Deactive', count: stats.deactive, icon: FiXCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ]

  return (
    <div className='mt-2'>
      
      {/* --- WRITER STATS GRID --- */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {statCards.map((stat, i) => (
          <div key={i} className='p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-md cursor-default'>
            <div className={`w-12 h-12 rounded-full flex justify-center items-center ${stat.bg} ${stat.color}`}>
              <stat.icon className='text-2xl' />
            </div>
            <div>
              <h3 className='text-2xl font-bold text-slate-800'>{loader ? '...' : stat.count}</h3>
              <p className='text-sm text-slate-500 font-medium'>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- MY RECENT ACTIVE NEWS TABLE --- */}
      <div className='bg-white rounded-2xl border border-slate-100 shadow-sm mt-8'>
        
        <div className='flex justify-between items-center px-6 py-5 border-b border-slate-100'>
          <h2 className='text-lg font-bold text-slate-800'>My Recent Active News</h2>
        </div>

        <div className='relative overflow-x-auto'>
          <table className='w-full text-sm text-left text-slate-600'>
            <thead className='text-xs text-slate-500 uppercase bg-slate-50 font-bold tracking-wider'>
              <tr>
                <th className='px-6 py-4'>No</th>
                <th className='px-6 py-4'>Title</th>
                <th className='px-6 py-4'>Image</th>
                <th className='px-6 py-4'>Category</th>
                <th className='px-6 py-4'>Date</th>
                <th className='px-6 py-4'>Status</th>
                <th className='px-6 py-4'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                loader ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-indigo-500 font-medium">Loading data...</td>
                  </tr>
                ) : activeNews.length > 0 ? activeNews.slice(0, 5).map((item, i) => (
                  <tr key={item._id} className='bg-white border-b border-slate-50 hover:bg-slate-50/50 transition-colors' >
                    <td className='px-6 py-4 font-medium text-slate-800'>{i + 1}</td>
                    <td className='px-6 py-4 font-medium text-slate-800 truncate max-w-[200px]' title={item.title}>{item.title}</td>
                    <td className='px-6 py-4'>
                      <img className='w-10 h-10 rounded-lg object-cover shadow-sm' src={item.image} alt="news" />
                    </td>
                    <td className='px-6 py-4'>{item.category}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{item.date}</td>
                    <td className='px-6 py-4'>
                      <span className='px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide bg-emerald-100 text-emerald-700'>
                        {item.status}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex justify-start items-center'>
                        <Link to={`/dashboard/news/preview/${item._id}`} className='p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-200'>
                          <FiEye className='text-lg' />
                        </Link>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-slate-500 font-medium">
                      You have no active news yet.
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  )
}

export default WriterIndex