'use client'
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import SigninButton from "./SigninButton";
import { useUserDetailContext } from "@/app/ConvexClientProvider";
import Link from "next/link";


function Header() {
  const { userDetail, setUserDetail } = useUserDetailContext();

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
      {/* Logo */}
      <Image src="/logo/logo.png" width={40} height={50} alt="logo" />

      {/* User Section */}
      <div className="flex items-center space-x-4">
        {userDetail?.email ? (
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
            <Button  variant="outline" className="hover:bg-gray-100">
              Dashboard
            </Button>
            </Link>
            {userDetail?.picture ? (
              <Image
                src={userDetail.picture}
                alt="user"
                width={40}
                height={40}
                className="rounded-full border border-gray-300"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">U</span>
              </div>
            )}
          </div>
        ) : (
          <SigninButton />
        )}
      </div>
    </header>
  );
}

export default Header;
