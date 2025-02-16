import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useConvex } from 'convex/react';
import { useUserDetailContext } from '@/app/ConvexClientProvider';
import { useEmailTemplate } from '@/app/ConvexClientProvider';
import { api } from '@/convex/_generated/api';

function EmailTemplateList() {
  const [emailList, setEmailList] = useState([]);
  const { userDetail } = useUserDetailContext();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();  
  const convex = useConvex();

  // Fetch email templates when user detail is available
  useEffect(() => {
    if (userDetail) {
      GetTemplateList();
    }
  }, [userDetail]);

  const GetTemplateList = async () => {
    try {
      const result = await convex.query(api.emailTemplate.GetAllUserTemplates, {
        email: userDetail?.email,
      });
      // Ensure the result is an array before setting it
      if (Array.isArray(result)) {
        setEmailList(result);
      } else {
        setEmailList([]); // If the result isn't an array, set it to an empty array
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      setEmailList([]); // Fallback to an empty array if there's an error
    }
  };

  return (
    <div>
      <h2 className='font-bold text-xl text-primary mt-6'>Workspace</h2>

      {emailList.length === 0 ? (
        <div className='flex justify-center mt-7 flex-col items-center'>
          <Image src="/logo/email.png" alt="Email Logo" height={250} width={250} />
          <Link href="/dashboard/create">
            <Button className='mt-6'>+ Create New Template</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {emailList.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-lg">
              <Image src="/logo/email.png" width={250} height={250} alt="Email Logo" />
              <h3 className="text-lg font-semibold mt-4">{item?.description}</h3>
              <p className="text-sm text-gray-500">Created on {new Date(item._creationtime).toLocaleDateString()}</p>
              <Link href={`/editor/${item._id}`}>
                <Button className="mt-4">View / Edit</Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmailTemplateList;
