import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import SigninButton from "./SigninButton";

function Hero() {
  return (
    <div className="px-10 md:px-28 lg:px-44 xl:px-56 flex flex-col items-center text-center">
      <h2 className="font-bold text-3xl md:text-4xl">
        AI-powered <span className="text-primary">Email Template</span>
      </h2>
      <p className="mt-2 text-gray-600 text-lg">
        AI Email Builder – a useful tool to streamline your workflow.
      </p>
      <div className="flex gap-5 mt-6">
        <Button variant="outline">Demo</Button>
   <SigninButton />
      </div>
      <div className="mt-8">
        <Image
          src="/logo/landing.png"
       width={1000}
          height={400}
          alt="Landing Image"
          className="rounded-lg shadow-lg" 
        />
      </div>
    </div>
  );
}

export default Hero;
