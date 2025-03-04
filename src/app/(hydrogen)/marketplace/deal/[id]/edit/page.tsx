'use client';

import { routes } from '@/config/routes';

import InfoForm from '@/app/shared-corky/board/board-form';

import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';

import { data } from '@/data/lefimall/board/data';

import { useState, useEffect } from 'react';



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
      name: '자유게시판',
    },
    {
      href: routes.board.index,
      name: '게시글 관리',
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

  return (

    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

      </PageHeader>

      <div className="@container">
        <InfoForm item={item} />
      </div>

      
    </>
  );


}
