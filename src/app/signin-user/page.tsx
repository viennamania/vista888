'use client';

///import SignInForm from './sign-in-form';

import SignInForm from './sign-in-form-corky';

import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import AuthWrapperTwo from '@/app/shared/auth-layout/auth-wrapper-two';
import AuthWrapperThree from '@/app/shared/auth-layout/auth-wrapper-three';
import AuthWrapperFour from '@/app/shared/auth-layout/auth-wrapper-four';
import AuthWrapperFive from '../shared/auth-layout/auth-wrapper-five';

import AuthWrapper from '@/app/shared-corky/auth-layout/auth-wrapper-corky';


import Image from 'next/image';
import UnderlineShape from '@/components/shape/underline';
import { metaObject } from '@/config/site.config';


import { useSession, signOut } from 'next-auth/react';

import { routes } from '@/config/routes';

import Link from 'next/link';



/*
export const metadata = {
  ...metaObject('Sign In'),
};
*/

  

export default function SignIn() {





  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (session) {

    // automatically redirect to home page if already signed in


    window.location.href = routes.home;


    return (

      
      <div>
        <p>Redirecting...</p>
        <Link href={routes.home}>Go to Home</Link>
      </div>
      

    );
  }





  return (
    
    <AuthWrapper
      title={
        <>
          {/*
          <span className="relative inline-block">
            
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36" />
          </span>{' '}
          */}
         창작자 로그인
        </>
      }
      //description=""
      //bannerTitle=""
      //bannerDescription=""
      isSocialLoginActive={false}
      /*
      pageImage={
        <div className="relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
        
          <Image
            src={
              'https://isomorphic-furyroad.s3.amazonaws.com/public/auth/sign-up.webp'
            }
            alt="Sign Up Thumbnail"
            fill
            priority
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
          
        </div>
      }
      */
      
    >
    



     
        <SignInForm />
      
      


    
    </AuthWrapper>
    

  
   

  );
}
