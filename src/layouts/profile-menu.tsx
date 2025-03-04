'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { Title, Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import cn from '@/utils/class-names';


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';


import { useSession, signOut } from 'next-auth/react';




const menuItems = [
  {
    name: 'My Profile',
    href: routes.profile,
  },
  {
    name: 'Account Settings',
    href: routes.forms.profileSettings,
  },
  {
    name: 'Activity Log',
    href: '#',
  },
];



function DropdownMenu(

  { userData, loadingUserData } : { userData: any, loadingUserData: boolean }

) {


  console.log("DropdownMenu userData:", userData);

 


  return (
    <div className="w-64 text-left rtl:text-right">

      
      

      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src={userData?.avatar || 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-12.webp'}
          name={userData?.name || 'John Doe'}
          color="invert"
        />
        <div className="ms-3">
          <Title as="h6" className="font-semibold">
            {userData?.name}
          </Title>
          <Text className="text-gray-600">{userData?.email}</Text>
        </div>
      </div>
        
        {/*

      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
        */}


      { userData?.shopId && userData?.shopId !== "" ? (
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">

        <Link
          ///href={routes.shop.memberDetails(session?.user?.id || '10003' )}

          href={routes.shop.memberDetails(userData?.shopId)}
          className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
        >
          내 상점
        </Link>


      </div>
      ) : (
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">

        <Link
          href={routes.user.myPage}
          className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
        >
          나의 정보
        </Link>
      </div>
      )}

      

      {/* login id form auth info */}
    


      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={() => {
            //signOut();

            signOut({ callbackUrl: '/' });

          }}
        >
          로그아웃
        </Button>
      </div>

    </div>
  );
}



export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);


  const { data: session } = useSession(); // pre-fetch session data


  ///console.log("use-table-products session:", session);

    /* fetch user data from an API
  /api/doingdoit/user/getUser
  */
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    name: "",
    nickname: "",
    avatar: "",
    shopId: "",
  });

  const [loadingUserData, setLoadingUserData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      if (!session?.user?.email) {
        return;
      }

      setLoadingUserData(true);

      const res = await fetch(`/api/corky/user/getUserByEmail?_email=${session?.user?.email}`);
      const json = await res?.json();

      

      const data = json as any;

      ///console.log('data ->', data);
      
      if (data.data) {
        setUserData(data.data);
      } else {
        //alert(json.message);
      }

      setLoadingUserData(false);
    };

    fetchData();
  } , [session?.user?.email]);  










  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => 

        <DropdownMenu

          userData={userData}
          loadingUserData={loadingUserData}
        
        />
      }
      shadow="sm"
      placement="bottom-end"
      className="z-50 p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"
    >

          <div className='flex flex-row gap-2 items-center justify-center'>

            <div className='flex' >
              {session?.user?.name}
            </div>

            <button
              className={cn(
                'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
                buttonClassName
              )}
            >

                <Avatar
                  src={session?.user?.image || 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-12.webp'}
                  name={session?.user?.name || 'John Doe'}
                  color="invert"
                  className={cn('!h-9 w-9 sm:!h-10 sm:w-10', avatarClassName)}
                />
            

            </button>

          </div>

    

      
    </Popover>
  );
}
