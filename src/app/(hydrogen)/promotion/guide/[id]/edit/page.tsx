'use client';

import { routes } from '@/config/routes';

import GuideForm from '@/app/shared-corky/guide/guide-form';

import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';


import { useEffect, useState } from 'react';


import { data } from '@/data/lefimall/guide/data';


/*
export const metadata = {
  ...metaObject('유형별가이드'),
};
*/

const pageHeader = {
  title: '유형별가이드',
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
      href: routes.operation.healthinfo,
      name: '유형별가이드',
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
        <GuideForm item={item} />
      </div>

      
    </>
  );


}
