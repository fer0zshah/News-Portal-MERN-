import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { 
    FiEye, 
    FiEdit, 
    FiFileText, 
    FiClock, 
    FiCheckCircle, 
    FiXCircle 
} from 'react-icons/fi'
import axios from 'axios'
import { base_url } from '../../config/config'
import storeContext from '../../context/storeContext'
import toast from 'react-hot-toast'

const NewContent = () => {
    const { store } = useContext(storeContext)
    const [news, setNews] = useState([])
    const [loader, setLoader] = useState(false)
    
    // Extract the user's role
    const userRole = store?.userInfo?.role

    // Fetch the news
    const fetchNews = async () => {
        try {
            setLoader(true)
            const { data } = await axios.get(`${base_url}/api/news`, {
                headers: {
                    'Authorization': `Bearer ${store.token}`
                }
            })
            setNews(data.news || [])
            setLoader(false)
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchNews()
    }, [])

    // Update status (Admin only)
    const handleStatusChange = async (news_id, newStatus) => {
        try {
            const { data } = await axios.put(`${base_url}/api/news/status-update/${news_id}`, 
                { status: newStatus },
                {
                    headers: {
                        'Authorization': `Bearer ${store.token}`
                    }
                }
            )
            toast.success(data.message)
            fetchNews()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update status')
        }
    }

    // --- CALCULATE STATS DYNAMICALLY ---
    const stats = {
        total: news.length,
        pending: news.filter(n => n.status === 'pending').length,
        active: news.filter(n => n.status === 'active').length,
        deactive: news.filter(n => n.status === 'deactive').length
    }

    // Configure the cards (Titles change based on role)
    const statCards = [
        { title: userRole === 'admin' ? 'Total News' : 'My Total News', count: stats.total, icon: FiFileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { title: userRole === 'admin' ? 'Pending News' : 'My Pending', count: stats.pending, icon: FiClock, color: 'text-amber-600', bg: 'bg-amber-50' },
        { title: userRole === 'admin' ? 'Active News' : 'My Active', count: stats.active, icon: FiCheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: userRole === 'admin' ? 'Deactive News' : 'My Deactive', count: stats.deactive, icon: FiXCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    ]

    return (
        <div className='px-4 pb-4'>
            
            {/* --- STATS GRID --- */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 mt-2'>
                {statCards.map((stat, i) => (
                    <div key={i} className='p-4 border border-slate-200 rounded-xl flex items-center gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors'>
                        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${stat.bg} ${stat.color}`}>
                            <stat.icon className='text-xl' />
                        </div>
                        <div>
                            <h3 className='text-xl font-bold text-slate-800'>{loader ? '...' : stat.count}</h3>
                            <p className='text-xs text-slate-500 font-medium uppercase tracking-wider'>{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- NEWS TABLE --- */}
            <div className='relative overflow-x-auto border border-slate-200 shadow-sm sm:rounded-lg'>
                <table className='w-full text-sm text-left text-slate-600'>
                    <thead className='text-xs text-slate-500 uppercase bg-slate-100 font-bold tracking-wider'>
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
                                        Loading news...
                                    </td>
                                </tr>
                            ) : news.length > 0 ? news.map((item, i) => (
                                <tr key={item._id} className='bg-white border-b border-slate-100 hover:bg-slate-50/80 transition-colors'>
                                    <td className='px-6 py-4 font-medium text-slate-800'>{i + 1}</td>
                                    <td className='px-6 py-4 font-medium text-slate-800 truncate max-w-[200px]' title={item.title}>{item.title}</td>
                                    <td className='px-6 py-4'>
                                        <img className='w-10 h-10 rounded-lg object-cover shadow-sm' src={item.image} alt="news" />
                                    </td>
                                    <td className='px-6 py-4'>{item.category}</td>
                                    <td className='px-6 py-4 whitespace-nowrap'>{item.date}</td>
                                    <td className='px-6 py-4'>
                                        {userRole === 'admin' ? (
                                            <select 
                                                value={item.status}
                                                onChange={(e) => handleStatusChange(item._id, e.target.value)}
                                                className={`text-sm rounded-md px-2 py-1 border outline-none font-semibold cursor-pointer
                                                    ${item.status === 'active' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 
                                                      item.status === 'pending' ? 'bg-amber-50 border-amber-200 text-amber-700' : 
                                                      'bg-rose-50 border-rose-200 text-rose-700'}`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="active">Active</option>
                                                <option value="deactive">Deactive</option>
                                            </select>
                                        ) : (
                                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide
                                                ${item.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 
                                                  item.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                                                  'bg-rose-100 text-rose-700'}`}
                                            >
                                                {item.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex justify-start items-center gap-2'>
                                            <Link to={`/dashboard/news/preview/${item._id}`} className='p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-200' title="Preview">
                                                <FiEye className='text-lg' />
                                            </Link>
                                            {userRole !== 'admin' && item.status === 'pending' && (
                                                <Link to={`/dashboard/news/edit/${item._id}`} className='p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-600 hover:text-white transition-all duration-200' title="Edit">
                                                    <FiEdit className='text-lg' />
                                                </Link>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-slate-500 font-medium">
                                        No news found.
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default NewContent