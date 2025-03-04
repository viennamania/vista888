'use client';

import { routes } from '@/config/routes';

import InfoForm from '@/app/shared-corky/feed/feed-info-form';

import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';

import { data } from '@/data/lefimall/feed/data';
import { useEffect, useState } from 'react';

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
      name: '피드백 작성',
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
