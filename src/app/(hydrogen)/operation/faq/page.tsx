import { routes } from '@/config/routes';

import { data } from '@/data/lefimall/faq/data';
import { getColumns } from '@/app/shared-corky/faq/columns';

import FaqTableWidget from '@/components/corky/faq-table-widget';


import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';


import { PiDownloadSimpleBold, PiPaperclip, PiRecordLight } from 'react-icons/pi';

import { Router } from 'next/router';
import Link from 'next/link';


export const metadata = {
  ...metaObject('FAQ'),
};

const pageHeader = {
  title: 'FAQ',
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
      name: 'FAQ',
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



      <FaqTableWidget
        title=""
        variant="minimal"
        data={data}
        // @ts-ignore
        getColumns={getColumns}
        enablePagination={true}
        
        searchPlaceholder="질문, 답변"

        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"

        scroll={{ x: 500, }}
      />

    </TableLayout>

  );
}
