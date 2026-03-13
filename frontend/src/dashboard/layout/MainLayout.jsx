import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className='w-full min-h-screen bg-slate-50 flex'>
            <Sidebar />
            
            {/* Main Content Area */}
            <div className='ml-[260px] w-[calc(100%-260px)] min-h-screen'>
                <Header />
                
                {/* Page Content Wrapper */}
                <div className='p-8 pt-[100px]'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainLayout