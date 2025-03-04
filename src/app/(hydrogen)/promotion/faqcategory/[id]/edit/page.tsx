'use client';

import { routes } from '@/config/routes';

import CategoryForm from '@/app/shared-corky/faq/category-form';

import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { metaObject } from '@/config/site.config';


import { useEffect, useState } from 'react';


import { data } from '@/data/lefimall/faq/category-data';


/*
export const metadata = {
  ...metaObject('FAQ분류관리'),
};
*/

const pageHeader = {
  title: 'FAQ분류관리',
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
      href: routes.operation.faqcategory,
      name: 'FAQ분류관리',
    },
    {
      name: '수정하기',
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
        <CategoryForm item={item} />
      </div>

      
    </>
  );


}
