import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
    FiGrid, 
    FiUserPlus, 
    FiUsers, 
    FiFilePlus, 
    FiFileText, 
    FiUser, 
    FiLogOut,
    FiHome // <-- 1. Add this import!
} from 'react-icons/fi'
import storeContext from '../../context/storeContext'

const Sidebar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { store, dispatch } = useContext(storeContext)

    const logout = () => {
        localStorage.removeItem('mewsToken')
        dispatch({ type: 'logout', payload: '' })
        navigate('/login')
    }

    const navStyle = (path) => `
        px-4 py-2.5 rounded-xl flex gap-x-3 items-center transition-all duration-200 text-sm font-medium
        ${pathname === path 
            ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
        }
    `

    return (
        <div className='w-[260px] h-screen fixed left-0 top-0 bg-white border-r border-slate-100 flex flex-col'>
            {/* Logo Section */}
            <div className='h-[80px] flex justify-center items-center mb-4'>
                <Link to='/'>
                    <img className='w-[190px] h-[35px] object-contain' src="https://news-portal-mern.onrender.com/assets/logo-00ebaab6.png" alt="Logo" />
                </Link>
            </div>

            {/* Navigation Links */}
            <div className='px-4 flex-1 flex flex-col gap-y-1.5'>
                
                {/* 2. THE NEW PUBLIC SITE BUTTON */}
                <Link to='/' className="px-4 py-2.5 rounded-xl flex gap-x-3 items-center transition-all duration-200 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 mb-2 border border-red-100">
                    <FiHome className='text-lg' />
                    <span>Go to Public Site</span>
                </Link>
                {/* ----------------------------- */}

                {store.userInfo?.role === 'admin' ? (
                    <>
                        <Link to='/dashboard/admin' className={navStyle('/dashboard/admin')}>
                            <FiGrid className='text-lg' />
                            <span>Dashboard</span>
                        </Link>
                        
                        <Link to='/dashboard/writer/add' className={navStyle('/dashboard/writer/add')}>
                            <FiUserPlus className='text-lg' />
                            <span>Add Writer</span>
                        </Link>
                        
                        <Link to='/dashboard/writers' className={navStyle('/dashboard/writers')}>
                            <FiUsers className='text-lg' />
                            <span>Writers</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to='/dashboard/writer' className={navStyle('/dashboard/writer')}>
                            <FiGrid className='text-lg' />
                            <span>Dashboard</span>
                        </Link>
                        
                        <Link to='/dashboard/news/create' className={navStyle('/dashboard/news/create')}>
                            <FiFilePlus className='text-lg' />
                            <span>Add News</span>
                        </Link>
                    </>
                )}

                <Link to='/dashboard/news' className={navStyle('/dashboard/news')}>
                    <FiFileText className='text-lg' />
                    <span>News</span>
                </Link>

                <Link to='/dashboard/profile' className={navStyle('/dashboard/profile')}>
                    <FiUser className='text-lg' />
                    <span>Profile</span>
                </Link>
            </div>

            {/* Logout Section */}
            <div className='p-4 border-t border-slate-100'>
                <button 
                    onClick={logout} 
                    className='w-full px-4 py-2.5 rounded-xl flex gap-x-3 items-center transition-all duration-200 text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600'
                >
                    <FiLogOut className='text-lg' />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    )
}

export default Sidebar