'use client';

import { routes } from '@/config/routes';



import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold, PiList, PiRecordLight, } from 'react-icons/pi';

import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';

///import { data } from '@/data/lefimall/product/data';

import Image from 'next/image';

import Details from '@/app/shared-corky/order/order-view';




/*
export const metadata = {
  ...metaObject('주문상세'),
};
*/

const pageHeader = {
  title: 'Order Details',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.order.index,
      name: 'Order',
    },
    {
      href: routes.order.index,
      name: 'Order List',
    },
    {
      name: 'Order Details',
    }
  ],
};




export default function Page({
  params,
}: {
  params: any;
}) {

  const id =  params?.id;



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
          List
        </button>

      </div>

      </PageHeader>

      <div className="@container">
        
        <Details id={id} />
      

        {/*
        <div className="mt-10 flex flex-col gap-10 items-center justify-center mb-4 ">

          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={100}
            className="object-contain"
          />


          <Image
            src="/images/undercontruction.gif"
            alt="Logo"
            width={300}
            height={100}
            className="object-contain"
          />

        </div>
        */}

      </div>

      
    </>
  );


}
