import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';


//import CreateOrder from '@/app/shared/ecommerce/order/create-order';

import CreateInfo from '@/app/shared-corky/healthinfo/health-info-create';


import ImportButton from '@/app/shared/import-button';
import { metaObject } from '@/config/site.config';



export const metadata = {
  ...metaObject('건강정보'),
};

const pageHeader = {
  title: '건강정보',
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
      name: '건강정보',
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
      
      <CreateInfo />

      {/*
      <CreateOrder />
      */}
    </>
  );
}
