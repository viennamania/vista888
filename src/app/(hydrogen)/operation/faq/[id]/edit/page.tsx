'use client';

import { routes } from '@/config/routes';

import InfoForm from '@/app/shared-corky/faq/info-form';

import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';

import { useRouter } from 'next/navigation';


import { useEffect, useState } from 'react';

import { data } from '@/data/lefimall/faq/data';

/*
export const metadata = {
  ...metaObject('건강정보'),
};
*/


const pageHeader = {
  title: 'FAQ',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.operation.healthinfo,
      name: '운영',
    },
    {
      href: routes.operation.faq,
      name: 'FAQ',
    },
    {
      name: '수정하기',
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
