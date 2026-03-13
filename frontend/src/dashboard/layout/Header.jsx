import React, { useContext } from 'react'
import profile from '../../assets/profile.png'
import storeContext from '../../context/storeContext'
import { FiSearch } from 'react-icons/fi'

const Header = () => {
  const { store } = useContext(storeContext)

  return (
    <div className='fixed w-[calc(100vw-260px)] top-0 left-[260px] z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6'>
      <div className='w-full h-[75px] flex justify-between items-center'>
        
        {/* Modern Search Input */}
        <div className='relative w-full max-w-md'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <FiSearch className='text-slate-400 text-lg' />
          </div>
          <input 
            type="text" 
            placeholder='Search anywhere...' 
            className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 placeholder-slate-400' 
          />
        </div>

        {/* Profile Section */}
        <div className='flex items-center gap-x-3 cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors'>
          <div className='flex flex-col items-end'>
            <span className='text-sm font-semibold text-slate-800 leading-tight'>
              {store.userInfo?.name || 'User'}
            </span>
            <span className='text-[11px] font-bold text-indigo-500 uppercase tracking-wider'>
              {store.userInfo?.role || 'Role'}
            </span>
          </div>
          <img 
            className='w-10 h-10 rounded-full border-2 border-slate-100 object-cover shadow-sm' 
            src={store.userInfo?.image ? store.userInfo.image : profile} 
            alt="profile" 
          />
        </div>

      </div>
    </div>
  )
}

export default Header