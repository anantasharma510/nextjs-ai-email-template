'use client'
import { useUserDetailContext } from '@/app/ConvexClientProvider';
import EmailTemplateList from '@/components/custom/EmailTemplateList';
import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button';
import React from 'react'

function Dashboard() {
  const {userDetail,setUserDetail} = useUserDetailContext();
  return (
    <div>
     <Header/>
<div>
<div className="p-10 md:px-28 lg:px-40 xl:px-56 mt-16">
          <h2 className="text-3xl font-semibold text-gray-800">Hello, {userDetail?.name}</h2>
          <Button> +Create new Template</Button>
        </div>
        <EmailTemplateList/>


</div>
    </div>
  )
}

export default Dashboard
