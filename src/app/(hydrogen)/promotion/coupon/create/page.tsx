import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';


//import CreateOrder from '@/app/shared/ecommerce/order/create-order';

import InfoCreate from '@/app/shared-corky/coupon/info-create';


import ImportButton from '@/app/shared/import-button';
import { metaObject } from '@/config/site.config';



export const metadata = {
  ...metaObject('쿠폰등록'),
};

const pageHeader = {
  title: '쿠폰등록',
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
      name: '쿠폰등록',
    }
  ],
};

export default function CreateOrderPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>

      </PageHeader>
      
      <InfoCreate />

      {/*
      <CreateOrder />
      */}
    </>
  );
}
