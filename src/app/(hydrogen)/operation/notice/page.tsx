import { routes } from '@/config/routes';


import { data } from '@/data/lefimall/notice/data';


import { getColumns } from '@/app/shared-corky/notice/columns';



import NoticeTableWidget from '@/components/corky/notice-table-widget';


import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';


import { PiDownloadSimpleBold, PiPaperclip, PiRecordLight } from 'react-icons/pi';

import { Router } from 'next/router';
import Link from 'next/link';


export const metadata = {
  ...metaObject('공지사항'),
};

const pageHeader = {
  title: '공지사항',
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
      name: '공지사항',
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



      <NoticeTableWidget
        title=""
        variant="minimal"
        
        //data={data}

        // @ts-ignore
        getColumns={getColumns}
        enablePagination={true}
        
        searchPlaceholder="제목, 내용"

        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"

        scroll={{ x: 500, }}
      />

    </TableLayout>

  );
}
