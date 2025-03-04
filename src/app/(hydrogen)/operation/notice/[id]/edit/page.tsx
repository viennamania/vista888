'use client';

import { routes } from '@/config/routes';

import InfoForm from '@/app/shared-corky/notice/info-form';

import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';

import { useEffect, useState } from 'react';

import { data } from '@/data/lefimall/notice/data';



/*
export const metadata = {
  ...metaObject('건강정보'),
};
*/


const pageHeader = {
  title: '공지사항',
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
      href: routes.operation.notice,
      name: '공지사항',
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
