'use client';

import { routes } from '@/config/routes';

import InfoView from '@/app/shared-corky/feed/feed-info-view';

import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';


import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold, PiList, PiRecordLight, } from 'react-icons/pi';

import { useRouter, } from 'next/navigation';

import { useEffect, useState } from 'react';

import DeletePopover from '@/app/shared-corky/delete-popover-large';



import { Modal } from '@/components/ui/modal';
import { Title, Text } from '@/components/ui/text';

import { ActionIcon } from '@/components/ui/action-icon';

import { data } from '@/data/lefimall/feed/data';



/*
export const metadata = {
  ...metaObject('피드 상세정보'),
};
*/

const pageHeader = {
  title: '피드 상세정보',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      name: '피드',
    },
    {
      href: routes.feed.index,
      name: '피드관리',
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





export default function Page({
  params,
}: {
  params: any;
}) {

  const id =  params?.id;
  //const { id } = useParams<{ id: string }>();

  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    data.map((item) => {
      if (item.id === id) {
        setItem(item);
      }
    });
    
  } ,[ id ]);


  const [open, setOpen] = useState(false);




  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

        <div className="flex items-center space-x-4">


          <DeletePopover
            title={`Delete`}
            description={`Are you sure you want to delete?`}
            onDelete={() => {
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
        <InfoView item={item} />
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
