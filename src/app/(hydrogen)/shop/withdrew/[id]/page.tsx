'use client';

import ProfileHeader from '@/app/shared-corky/profile/profile-header';
import ProfileDetails from '@/app/shared-corky/profile/withdrew-details';

import { metaObject } from '@/config/site.config';

import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import PageHeader from '@/app/shared/page-header';

import DeletePopover from '@/app/shared-corky/delete-popover-large';
import RecoveryPopover from '@/app/shared-corky/recovery-popover-large';

import { useRouter } from 'next/navigation';
import { PiList } from 'react-icons/pi';


import { useState } from 'react';

import { Modal } from '@/components/ui/modal';
import { Title, Text } from '@/components/ui/text';



/*
export const metadata = {
  ...metaObject('Profile'),
};
*/

const pageHeader = {
  title: '상세보기',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.user.index,
      name: 'User',
    },
    {
      href: routes.user.withdrew,
      name: 'Inactive User',
    },
    {
      name: '상세보기',
    },
  ],
};


const modalData = {
  title: '',
  description: '',
  data: [],
};



export default function ProfilePage() {

  const { push } = useRouter();


  const [open, setOpen] = useState(false);


  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

         {/* goto list */}
         <div className="p-5 flex items-center justify-end gap-5">



            <RecoveryPopover
              title={`계정복구`}
              description={`복구하시겠습니까?`}
              onDelete={() => {
                //push(routes.user.withdrew);
                setOpen(true);
                modalData.description = '복구되었습니다.';
              }}
            />

            <DeletePopover
              title={`Delete`}
              description={`Are you sure you want to delete?`}
              onDelete={() => {
                //push(routes.user.withdrew);
                setOpen(true);
                modalData.description = 'Deleted!';
              }}
            />

            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              onClick={() => window.history.back()}
            >
              <PiList className="me-2 h-4 w-4" />
              {'List'}
            </button>


          </div>

      </PageHeader>

      <div className="@container">
        <ProfileHeader id={'3414'}/>
        <ProfileDetails id={'3414'}/>
      </div>



      {/* modal view */}
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          //setActive(() => 'posts');
        }}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
        containerClassName="dark:bg-gray-100 max-w-[460px] rounded-md p-5 lg:p-6"
      >
        <div className="flex flex-col items-center justify-center gap-10 m-5">
            {/*
          <Title
            as="h3"
            className="text-lg font-semibold text-gray-900 xl:text-xl"
          >
            {modalData.title}
          </Title>
        
          <Button
            variant="text"
            onClick={() => {
              setOpen(false);
              setActive(() => 'posts');
            }}
            className="h-auto px-1 py-1"
          >
            <PiXBold className="h-5 w-5 text-base" />
          </Button>
          */}

            {modalData.description && (
              <div className="">
                <Text
                  as="p"
                  className="text-base font-semibold text-gray-900 xl:text-lg"
                >
                  {modalData.description}
                </Text>
              </div>
            )}

              {/*
            <Button
              variant="text"
              onClick={() => {
                setOpen(false);
                setActive(() => 'posts');
              }}
              className="h-auto px-1 py-1"
            >
              <PiXBold className="h-5 w-5 text-base" />
            </Button>
            */}
            {/* close button */}
            <Button
              size="lg"
              color="primary"
              className='flex items-center space-x-2'
              onClick={() => {
                setOpen(false);
                //setActive(() => 'posts');
              }}
            >
              Close
            </Button>

          
        </div>

              {/*
        {modalData && <FollowerModal data={modalData.data} />}
              */}
      </Modal>

      
    </>
  );
}
