import AuthWrapperFour from '@/app/shared/auth-layout/auth-wrapper-four';

import AuthWrapper from '@/app/shared-corky/auth-layout/auth-wrapper-corky';


import SignUpForm from './sign-up-form';

import { metaObject } from '@/config/site.config';

import Image from 'next/image';

import Link from 'next/link';
import { routes } from '@/config/routes';


export const metadata = {
  ...metaObject('Sign Up 4'),
};

export default function SignUpPage() {

  
  return (
    
    <AuthWrapper
      title="입점문의"
      isSocialLoginActive={false}
    >

      
      <SignUpForm />
      
        <div className="flex gap-10 items-center justify-center mt-6">
          <Link
            href={routes.home}
            className="font-semibold text-gray-700 transition-colors hover:text-blue"
          >
            홈으로
          </Link>

      </div>

    </AuthWrapper>

  );
  


  
  
}
