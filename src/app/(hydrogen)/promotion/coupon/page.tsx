import { routes } from '@/config/routes';


import { data } from '@/data/lefimall/coupon/data';


import { getColumns } from '@/app/shared-corky/coupon/columns';



import CouponTableWidget from '@/components/corky/coupon-table-widget';


import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';


import { PiDownloadSimpleBold, PiPaperclip, PiRecordLight } from 'react-icons/pi';

import { Router } from 'next/router';
import Link from 'next/link';


export const metadata = {
  ...metaObject('쿠폰관리'),
};

const pageHeader = {
  title: '쿠폰관리',
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
      name: '쿠폰관리',
    },
  ],
};

export default function SearchTablePage() {


  return (

    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      //data={memberData}
      fileName=""
      
      //header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
    >



      <CouponTableWidget
        title=""
        variant="minimal"
        
        //data={data}

        // @ts-ignore
        getColumns={getColumns}
        enablePagination={true}
        
        searchPlaceholder="쿠폰명"

        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"

        scroll={{ x: 500, }}
      />

    </TableLayout>

  );
}
