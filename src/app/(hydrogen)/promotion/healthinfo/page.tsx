import { routes } from '@/config/routes';


import { data } from '@/data/lefimall/healthinfo/data';


import { getColumns } from '@/app/shared-corky/healthinfo/columns';

import HealthinfoTableWidget from '@/components/corky/healthinfo-table-widget';


import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';


import { PiDownloadSimpleBold, PiPaperclip, PiRecordLight } from 'react-icons/pi';

import { Router } from 'next/router';
import Link from 'next/link';


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
      name: '건강정보',
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



      <HealthinfoTableWidget
        title=""
        variant="minimal"
        data={data}
        // @ts-ignore
        getColumns={getColumns}
        enablePagination={true}
        
        searchPlaceholder="닉네임, 제목, 태그"

        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
      />

    </TableLayout>

  );
}
