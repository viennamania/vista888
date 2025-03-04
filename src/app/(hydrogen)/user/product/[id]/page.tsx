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


import InfoView from '@/app/shared-corky/product/user-product-view';


/*
export const metadata = {
  ...metaObject('상품관리'),
};
*/


const pageHeader = {
  title: '상품정보',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.product.index,
      name: '상품',
    },
    {
      name: '상품정보',
    }
  ],
};




export default function Page({
  params,
}: {
  params: any;
}) {

  const id =  params?.id;


  const { push } = useRouter();


  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>



      </PageHeader>

      <div className="@container">
        
        <InfoView id={id} />
        

      </div>

      
    </>
  );


}
