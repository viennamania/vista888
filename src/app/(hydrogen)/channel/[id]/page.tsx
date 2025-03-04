'use client';

import { routes } from '@/config/routes';

import InfoView from '@/app/shared-corky/channel/channel-view';

import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold, PiList, PiRecordLight, } from 'react-icons/pi';

import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';

import { data } from '@/data/lefimall/channel/data';


/*
export const metadata = {
  ...metaObject('상세보기'),
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
      href: routes.channel.index,
      name: '채널',
    },
    {
      href: routes.channel.index,
      name: '채널관리',
    },
    {
      name: '상세보기',
    },
  
    
  ],
};




export default function Page({
  params,
}: {
  params: any;
}) {

  const id =  params?.id;

  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    data.map((item) => {
      if (item.id === id) {
        setItem(item);
      }
    });
    
  } ,[ id ]);


  const { push } = useRouter();


  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

      <div className="flex items-center space-x-4">

        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          onClick={() => window.history.back()}
        >
          <PiList className="me-2 h-4 w-4" />
          
        </button>

      </div>

      </PageHeader>

      <div className="@container">
        <InfoView item={item} />
      </div>

      
    </>
  );


}
