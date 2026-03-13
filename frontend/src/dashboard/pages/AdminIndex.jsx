import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiEye, 
  FiFileText, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle, 
  FiUsers, 
  FiArrowRight 
} from 'react-icons/fi'
import axios from 'axios'
import { base_url } from '../../config/config'
import storeContext from '../../context/storeContext'
import toast from 'react-hot-toast'

const AdminIndex = () => {
  const { store } = useContext(storeContext)
  
  // 1. Setup states for our real data
  const [loader, setLoader] = useState(false) // <--- THIS WAS MISSING!
  const [news, setNews] = useState([])
  const [dashboardStats, setDashboardStats] = useState({
    total: 0,
    pending: 0,
    active: 0,
    deactive: 0,
    writers: 0
  })

  // 2. Fetch the real data from the backend
  const fetchDashboardData = async () => {
    try {
      setLoader(true)
      
      const { data } = await axios.get(`${base_url}/api/news`, {
        headers: {
          'Authorization': `Bearer ${store.token}`
        }
      })
      
      const allNews = data.news || []

      // Calculate the dashboard stats!
      const pendingCount = allNews.filter(n => n.status === 'pending').length
      const activeCount = allNews.filter(n => n.status === 'active').length
      const deactiveCount = allNews.filter(n => n.status === 'deactive').length

      // Update the state with our calculated data
     // 3. Update the state: Keep all stats, but ONLY put 'active' news in the table
    const onlyActiveNews = allNews.filter(n => n.status === 'active')
    setNews(onlyActiveNews) 

      setDashboardStats({
        total: allNews.length,
        pending: pendingCount,
        active: activeCount,
        deactive: deactiveCount,
        writers: 3 // We will wire up the real writer count later
      })

      setLoader(false)
    } catch (error) {
      console.log("Fetch error:", error)
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  // 3. Update the stats array to use our dynamic state
  const stats = [
    { title: 'Total News', count: dashboardStats.total || 0, icon: FiFileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Pending News', count: dashboardStats.pending || 0, icon: FiClock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Active News', count: dashboardStats.active || 0, icon: FiCheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Deactive News', count: dashboardStats.deactive || 0, icon: FiXCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    { title: 'Writers', count: dashboardStats.writers || 0, icon: FiUsers, color: 'text-blue-600', bg: 'bg-blue-50' },
  ]

  return (
    <div className='mt-2'>
      
      {/* --- STATS GRID --- */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6'>
        {stats.map((stat, i) => (
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

      {/* --- RECENT NEWS TABLE --- */}
      <div className='bg-white rounded-2xl border border-slate-100 shadow-sm mt-8'>
        
        <div className='flex justify-between items-center px-6 py-5 border-b border-slate-100'>
          <h2 className='text-lg font-bold text-slate-800'>Recent News</h2>
          <Link to="/dashboard/news" className='text-sm font-semibold text-indigo-600 flex items-center gap-1 hover:text-indigo-700 transition-colors'>
            View all <FiArrowRight />
          </Link>
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
                    <td colSpan="7" className="px-6 py-8 text-center text-indigo-500 font-medium">
                      Loading data...
                    </td>
                  </tr>
                ) : news.length > 0 ? news.slice(0, 5).map((item, i) => (
                  <tr key={item._id || i} className='bg-white border-b border-slate-50 hover:bg-slate-50/50 transition-colors' >
                    <td className='px-6 py-4 font-medium text-slate-800'>{i + 1}</td>
                    <td className='px-6 py-4 font-medium text-slate-800 truncate max-w-[200px]' title={item.title}>{item.title}</td>
                    <td className='px-6 py-4'>
                      <img className='w-10 h-10 rounded-lg object-cover shadow-sm' src={item.image} alt="news" />
                    </td>
                    <td className='px-6 py-4'>{item.category}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{item.date}</td>
                    <td className='px-6 py-4'>
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide
                        ${item.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 
                          item.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                          'bg-rose-100 text-rose-700'}`}
                      >
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
                      No recent news found.
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

export default AdminIndex