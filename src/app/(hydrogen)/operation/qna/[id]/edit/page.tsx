'use client';

import { routes } from '@/config/routes';

import InfoForm from '@/app/shared-corky/qna/qna-info-form';

import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';

import { data } from '@/data/lefimall/qna/data';
import { useEffect, useState } from 'react';

/*
export const metadata = {
  ...metaObject('답변하기'),
};
*/
const pageHeader = {
  title: '운영',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.operation.notice,
      name: '운영',
    },
    {
      href: routes.operation.qna,
      name: '이용문의',
    },
    {
      name: '답변하기',
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
