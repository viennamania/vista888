import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';

import ImportButton from '@/app/shared/import-button';
import { metaObject } from '@/config/site.config';
import CreateGuide from '@/app/shared-corky/guide/guide-create';



export const metadata = {
  ...metaObject('유형별가이드'),
};

const pageHeader = {
  title: '유형별가이드',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.operation.guide,
      name: '운영',
    },
    {
      href: routes.operation.guide,
      name: '유형별가이드',
    },
    {
      name: '등록하기',
    },
  ],
};

export default function CreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

      </PageHeader>
      
      <CreateGuide />

      {/*
      <CreateOrder />
      */}
    </>
  );
}
