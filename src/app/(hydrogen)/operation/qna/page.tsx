import { routes } from '@/config/routes';



import { data } from '@/data/lefimall/feed/data';


import { getColumns, getWidgetColumns } from '@/app/shared-corky/qna/columns';



//import { memberData } from '@/data/lefimall/user/member-data';

///import { getColumns } from '@/app/shared-corky/user/member-columns';



import QnaTableWidget from '@/components/corky/qna-table-widget';

import ShipmentTable from '@/app/shared-corky/feed/feed-table/shipment-table';


import TableLayout from './table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';

export const metadata = {
  ...metaObject('피드관리'),
};

const pageHeader = {
  title: '이용문의',
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
      name: '이용문의',
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

      {/*
      <div className='mb-5 w-full flex flex-row items-center justify-end'>
        <Button className=" @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
          <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
          엑셀다운로드
        </Button>
      </div>
    */}
      
      <QnaTableWidget
        title=""
        variant="minimal"

        data={data}
        
        // @ts-ignore
        getColumns={getColumns}
        enablePagination={true}
        
        searchPlaceholder="이름, 닉네임"

        ////setPageSize={setPageSize}

        className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"

        scroll={{ x: 500, }}
      />
      

      {/*

        <ShipmentTable
        />
      */}

    </TableLayout>
  );
}
