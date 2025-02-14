'use client'; // This ensures the component is rendered on the client side.

import { useGoogleLogin } from '@react-oauth/google';
import React from 'react';
import { Button } from '../ui/button';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

function SigninButton() {
  const CreateUser = useMutation(api.users.CreateUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log(tokenResponse);
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } }
        );
        console.log(userInfo.data);
        const user = userInfo.data;

        const result = await CreateUser({
          name: user?.name ?? "",
          email: user?.email ?? "",
          picture: user?.picture ?? "",
        });

        

        const userDetail = {
          ...user,
          _id: result?._id ?? result,
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem('userDetail', JSON.stringify(userDetail));
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div>
      <Button onClick={googleLogin}>Sign in with Google</Button>
    </div>
  );
}

export default SigninButton;
