'use client'
import { useUserDetailContext } from '@/app/ConvexClientProvider';
import Header from '@/components/custom/Header'
import React from 'react'

function Dashboard() {
  const {userDetail,setUserDetail} = useUserDetailContext();
  return (
    <div>
     <Header/>
<div>
<div className=" py-4">
          <h2 className="text-2xl font-semibold text-gray-800">Hello, {userDetail?.name}</h2>
        </div>
</div>
    </div>
  )
}

export default Dashboard
