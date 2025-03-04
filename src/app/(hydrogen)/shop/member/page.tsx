import { routes } from '@/config/routes';

import { getColumns } from '@/app/shared-corky/shop/member-columns';


import ShopTableWidget from '@/components/corky/shop-table-widget';


import TableLayout from '../table-layout';
import { metaObject } from '@/config/site.config';

import { Button } from '@/components/ui/button';
import { PiDownloadSimpleBold } from 'react-icons/pi';



export const metadata = {
  ...metaObject('Management'),
};

const pageHeader = {
  title: 'Management',
  breadcrumb: [
    {
      href: "/",
      name: 'Home',
    },
    {
      href: routes.shop.member,
      name: 'Merchant',
    },
    {
      name: 'Management',
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


      <ShopTableWidget
        title=""
        
        //variant="minimal"
        variant="modern"
        // @ts-ignore
        getColumns={getColumns}
        enablePagination={true}
        
        searchPlaceholder="아이디, 업체명"

        ////setPageSize={setPageSize}

        className="w min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"

        scroll={{ x: 500, }}
      />

    </TableLayout>
  );
}
