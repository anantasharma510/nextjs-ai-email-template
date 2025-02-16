import React, { useState } from 'react'
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';

function EmailTemplateList() {
    const [emailList,setEmailList] = useState([]);
  return (
    <div>
       <h2 className='font-bold text-xl text-primary mt-6'>Workspace</h2>
       {emailList?.length==0 && 
       <div className='flex justify-center mt-7 
       flex-col items-center '>
        <Image
        src="/logo/email.png"
        alt="Email Logo"
        height={250}
        width={250} />
        <Link href={"/dashboard/create"}>
        <Button className='mt-6'> +Create new Template</Button>
        </Link>

        </div>}
    </div>
  )
}

export default EmailTemplateList
