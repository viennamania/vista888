'use client';

import { routes } from '@/config/routes';



import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';

import { useEffect, useState } from 'react';

import { data } from '@/data/lefimall/coupon/data';


import InfoForm from '@/app/shared-corky/coupon/info-form';



/*
export const metadata = {
  ...metaObject('배너수정'),
};
*/

const pageHeader = {
  title: '쿠폰수정',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.promotion.banner,
      name: '프로모션',
    },
    {
      href: routes.promotion.coupon,
      name: '쿠폰관리',
    },
    {
      name: '쿠폰수정',
    }
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


  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

      </PageHeader>

      <div className="@container">
        <InfoForm item={item}/>
      </div>

      
    </>
  );


}
