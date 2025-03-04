import Header from './header-refi';
import Sidebar from '@/layouts/hydrogen/sidebar';


import { useSession, signOut } from 'next-auth/react';

import Link from 'next/link';


export default function HydrogenLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const { data: session, status } = useSession();


  return (
    <main className="flex min-h-screen flex-grow flex-col dark:bg-gray-100 dark:text-gray-900">

      <div className="fixed top-0 left-0 z-50 w-full h-1 bg-gradient-to-r from-[#f472b6] via-[#fbbf24] to-[#60a5fa]"></div>

        { session ? (
          
          <>
            <Sidebar className="fixed hidden dark:bg-gray-50 xl:block" />


            <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)] ">
            

              <Header />
              <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
                {children}
              </div>


            </div>


            
          </>

        ) : (
          <>
          
          <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
            {children}
          </div>

          {/* footer located at the bottom of the page */}
          
          <div className="fixed bottom-0 left-0 z-50 w-full h-28 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-50">
            <Footer />
          </div>

          </>

        )}



 
          {/* black backgroud footer
            copy right
            terms of service
            privacy policy
            buttom fixed
          */}
          {/*
          <div className="fixed bottom-0 left-0 z-50 w-full h-14 bg-black text-white">
            <div className="mt-10 container mx-auto text-center">
              <p className="text-sm">© 2024 Corky. All rights reserved.</p>
            </div>
          </div>
          */}

     
     



    </main>
  );
}



const footerMenu = [
  {
    name: 'Help',
    href: '/',
  },
  {
    name: 'Privacy',
    href: '/',
  },
  {
    name: 'Terms',
    href: '/',
  },
];

function Footer() {
  return (
    <footer className="flex flex-col-reverse items-center justify-between px-4 py-5 lg:flex-row lg:px-16 lg:py-6 2xl:px-24 2xl:py-10">
      <div className="text-center leading-relaxed text-gray-500 lg:text-start">
        © Copyright 2024.{' '}
        <Link
          href="https://www.devunlimit.com/"
          className="font-medium transition-colors hover:text-primary"
        >
          Devunlimit
        </Link>
        , all rights reserved.
      </div>
      <div className="-mx-2.5 flex items-center justify-end pb-3 font-medium text-gray-700 lg:w-1/2 lg:pb-0">
        {footerMenu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="px-2.5 py-1.5 transition-colors hover:text-primary"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </footer>
  );
}